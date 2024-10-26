import pyodbc
class Teacher:
    def __init__(self, id, name, birthDay):
        self.__id = id
        self.__name = name
        self.__birthDay = birthDay
    def __str__(self):
        return f"ID: {self.__id}, Name: {self.__name}, BirthDay: {self.__birthDay}"

class TeacherManager:
    def __init__(self, connection_string):
        self.connection = pyodbc.connect(connection_string)

    def create_teacher(self, id, name, birthDay):
        with self.connection.cursor() as cursor:
            cursor.execute('''INSERT INTO TEACHERS(id, name, birthDay) VALUE(? ? ?)''',
            (id, name, birthDay))
            self.connection.commit()
            print(f"Teacher {name} added.")
            
    def __del__(self):
        self.connection.close()
