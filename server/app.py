import os
from flask import Flask,jsonify,request
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_login import LoginManager
from flask_login import UserMixin
from werkzeug.security import check_password_hash,generate_password_hash
from flask_cors import CORS
login_manager = LoginManager()

app = Flask(__name__)
app.config["SECRET_KEY"] = "mysecretkey"
basedir = os.path.abspath(os.path.dirname(__file__))
app.config["SQLALCHEMY_DATABASE_URI"] = 'sqlite:///' + os.path.join(basedir,'data.sqlite')
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
CORS(app)
db = SQLAlchemy(app)
Migrate(app,db)
login_manager.init_app(app)


class User(db.Model,UserMixin):
    __tablename__="User"
    id = db.Column(db.Integer,primary_key=True)
    email = db.Column(db.String(64),unique=True,index=True)
    username = db.Column(db.String(128),unique=True,index=True)
    password_hash = db.Column(db.String(128))

    todos = db.relationship('TodoMaster',backref="User",uselist=False)


    def __init__(self,email,username,password):
        self.email = email
        self.username = username
        self.password_hash = generate_password_hash(password)

    def check_password(self,password):
        return check_password_hash(self.password_hash,password) 

 

class TodoMaster(db.Model):
    __tablename__="TodoMaster"
    id = db.Column(db.Integer,primary_key=True)
    todo_master = db.Column(db.String(128))
    user_id = db.Column(db.Integer,db.ForeignKey('User.id'))
    
    todos = db.relationship('Todo',backref="TodoMaster",uselist=False)

    def __init__(self,todo_master,user_id):
        self.todo_master = todo_master
        self.user_id = user_id
    # def __repr__(self):
    #     return f"toto_master_name:{self.todo_master} self_todo_master_id: {self.id} self_master_user_id {self.user_id}"

class Todo(db.Model):
    __tablename__="todolist"
    id = db.Column(db.Integer,primary_key=True)
    todo = db.Column(db.String(128))
    is_active = db.Column(db.Boolean, unique=False, default=True)
    todo_id = db.Column(db.Integer,db.ForeignKey('TodoMaster.id'))
    
    def __init__(self,todo,todo_id):
        self.todo =todo
        self.todo_id = todo_id



def check_username(username):
    if User.query.filter_by(username=username).first():
        return True
def check_email(email):
    if User.query.filter_by(email=email).first():
        return True

db.create_all()
@app.route('/')
def home():
    return "<h1>hello </h1>"





@app.route('/api/registergetusers',methods=['GET'])
def get_all_users():
    all_users = User.query.all()
    print(all_users)
    for num in all_users:
        print(num)
    return "success"

@app.route('/api/register',methods=['POST'])
def register():
    data = request.json
    email = data['email']
    username = data['username']
    if check_email(email) or check_username(username):
        alert="email and password already exists" 
        return jsonify({'alert':alert})
    else:
        user = User(data['email'],data['username'],data['password'])
        db.session.add(user)
        db.session.commit()
        result = {'email':data['email'],'username':data['username'],'password':data['password']}
        return jsonify({'result':"success"})

def take_login_id(loginid):
    take_login_id.variable = loginid
    print(take_login_id.variable)
    


@app.route('/api/login',methods=['POST'])
def login():
    print(request.json)
    data = request.json
    email = data['email']
    password = data['password']
    user = User.query.filter_by(email=email).first()
    try:
        if user.check_password(password) and user is not None:

            u_id= user.id    
            take_login_id(u_id)
            result = {'email':email,'password':password,"id":u_id}
            return jsonify({'result':result})
        else:
            return "incorrect username or password please register"
    except:
        return "username already exists"


@app.route('/api/todomaster',methods=['POST'])
def todomaster():
    print("todo master is called-------------------------------------------------------------")
    data = request.json
    print(data)
    Todo_master = data['todo_master']
    user_id = data['user_id']
    todo = TodoMaster(Todo_master,user_id)
    db.session.add(todo)
    db.session.commit()
    result = {'todo_bucket':Todo_master,'user_id':user_id}
    return jsonify({'result':result})

@app.route('/api/todomasterget',methods=['GET'])
def todomasterget():
    alltodomasters = TodoMaster.query.all()
    todo_values = {}

    for num in alltodomasters:
        if(num.user_id in todo_values.keys()):
            todo_values[num.user_id].append(num.todo_master)
        else:
            todo_values[num.user_id] = [num.todo_master]
    return jsonify({"array":todo_values})




@app.route('/api/todomastergetbyid',methods=['GET'])
def todomastergetbyid():
    # data = request.json
    # print(data)
    # id = data['id']
    login_id = take_login_id.variable

    alltodomasters = TodoMaster.query.filter_by(user_id=login_id).all()
    todo_values = {}
    try:
        for num in alltodomasters:
            if(num.user_id in todo_values.keys()):
                todo_values[num.user_id].append({"task":num.todo_master,"id":num.id})
            else:
                todo_values[num.user_id] = [{"task":num.todo_master,"id":num.id}]
        print([todo_values])
        
        return jsonify({"arrays":[todo_values]})
    except:
        return jsonify({"result":todo_values})       




@app.route('/api/deleteMaster',methods=['POST'])
def todomasterdelete():
    data = request.json
    id = data['id']
    try:
        del_id = TodoMaster.query.get(id)
        db.session.delete(del_id)
        db.session.commit()
        return jsonify({"result":"deleted"})
    except:
        return jsonify({"result":"already deleted"})
    

@app.route('/api/todofinal',methods=['POST'])
def todofinal():
    data = request.json
    todo = data['todo']
    todo_id = data['todo_id']
    todo_value = Todo(todo,todo_id)
    db.session.add(todo_value) 
    db.session.commit()
    return jsonify({"result":{"todo":todo,"todo_id":todo_id}})


@app.route('/api/todoitemsget',methods=['GET'])
def todoitems():
    todo_items= {}
    alltodo = Todo.query.all()
    for num in alltodo:
    
        if(num.todo_id in todo_items.keys()):
            todo_items[num.todo_id].append(num.todo)
        else:
            todo_items[num.todo_id] = [num.todo]
    
    return jsonify({"result":todo_items})


@app.route('/api/todochilditemsbyid',methods=['POST'])
def todochilditemsbyid():
    data=request.json
    print(data , "this is the data ............................................ ")
    id = data["id"]
    todoChildItems = Todo.query.filter_by(todo_id=id).all()
    print(todoChildItems , "these are child iitems")
    todo_values = {}
    
    # todo_values_default = {id:[{"task":"","id":None,"active":None},{"task":"","id":None,"active":None},{"task":"","id":None,"active":None}]}
    todo_values_default = { id: [ { "active":"true" ,"id":0, "task": "" }] } 
    try:
        if len(todoChildItems) == 0:
            return jsonify({"array":[todo_values_dafault]})
        else:
            for num in todoChildItems:
                if(num.todo_id in todo_values.keys()):
                    todo_values[num.todo_id].append({"task":num.todo,"id":num.id,"active":num.is_active})
                else:
                    todo_values[num.todo_id] = [{"task":num.todo,"id":num.id,"active":num.is_active}]
            print([todo_values] ,"this is todo values ")
            return jsonify({"arrays":[todo_values]})
    except:
        return jsonify({"arrays":[ {str(id) : {"task":"","id":None,"active":None} }]})   


@app.route('/api/deleteitems',methods=['POST'])
def deletetotoitems():
    data = request.json
    id = data['id']
    try:
        del_id = Todo.query.get(id)
        db.session.delete(del_id)
        db.session.commit()
        return jsonify({"result":"deleted"})
    except:
        return jsonify({"result":"error"})

@app.route('/api/updatetodo',methods=['PUT'])
def updatetodo():
    data = request.json
    id = data['id']
    todo = data['todo']
    update = Todo.query.filter_by(id=id).first()
    update.todo = todo
    db.session.commit()
    return " hello"
  

@app.route('/api/updatetodocomplete',methods=['PUT'])
def updatetodocomplete():
    data = request.json
    id = data['id']
    todo_activity = data['todo']
    print(data)
    update = Todo.query.filter_by(id=id).first()
    print(data['todo'])
    update.is_active = data['todo']
    db.session.commit()
    return "updated"


if __name__ == "__main__":
    app.run(debug=True)
