from pymongo import MongoClient
import json

class Robot(object):
    nombre = ""
    peso = ""
    profesor = ""
    representante = ""
    escuela = ""
    categoria = ""
    alumnos = []

    def __init__(self,data):
        self.nombre = data["nombre"]
        self.peso = data["peso"]
        self.profesor = type('', (object, ), data["profesor"])()
        self.representante = type('', (object, ), data["representante"])()
        self.escuela = data["escuela"]
        self.categoria = data["categoria"]
        self.alumnos = [type('', (object, ), a)() for a in data["alumnos"]]

    @classmethod
    def get_all(cls):
        client = MongoClient('mongodb://localhost:27017/')
        db = client.comprobot
        return [Robot(r) for r in list(db.robots.find({}))]


    def guardar(self):
        client = MongoClient('mongodb://localhost:27017/')
        db = client.comprobot
        return db.robots.insert_one(self.json_serialize).inserted_id
        
    def json_serialize(self):
        dic=self.__dict__
        dic["profesor"] = {"nombre":self.profesor.nombre,"dni":self.profesor.dni,"email":self.profesor.email}
        dic["representante"] = {"nombre":self.representante.nombre,"dni":self.representante.dni,"email":self.representante.email}
        dic["alumnos"] = [{"nombre":a.nombre,"dni":a.dni,"email":a.email} for a in self.alumnos]
        return dic