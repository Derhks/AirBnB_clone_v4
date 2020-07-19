#!/usr/bin/python3
"""
Documentation
"""
import cmd
from models.base_model import BaseModel
from models import storage
from models.user import User
from models.state import State
from models.city import City
from models.amenity import Amenity
from models.place import Place
from models.review import Review


class HBNBCommand(cmd.Cmd):
    """
    Documentation
    """
    prompt = '(hbnb) '
    class_types = ["BaseModel", "State", "User",
                   "City", "Amenity", "Place", "Review"]

    def default(self, arg):
        """Extern Commands:
        This method evaluates the command given, in a
        specific format and executes it acordingly with
        the proper function by spliting the arguments and
        returning a function.\n
        Values used:
        \t arg - the values to be formated.
        usage: <BaseClass>.<Function>
        """
        Command = arg.split(".")
        if len(Command) > 1 and Command[1]:
            if Command[1].startswith("all()"):
                return self.do_all(Command[0])

            elif Command[1].startswith("count()"):
                List = storage.all()
                print(sum([1 for key in List.keys() if
                           key.split(".")[0] == Command[0]]))
            elif Command[1].startswith("show(") and Command[1].endswith(")"):
                content = Command[1][Command[1].find("(") + 2:
                                     Command[1].find(")") - 1]
                n_format = "{} {}".format(Command[0], content)
                return self.do_show(n_format)
            elif Command[1].startswith("destroy(") and Command[1].endswith(
                    ")"):
                content = Command[1][Command[1].find("(") + 2:
                                     Command[1].find(")") - 1]
                n_format = "{} {}".format(Command[0], content)
                return self.do_destroy(n_format)
            else:
                cmd.Cmd.default(self, arg)
        else:
            cmd.Cmd.default(self, arg)

    def do_quit(self, arg):
        """Quits the console
        """
        return True

    def do_EOF(self, arg):
        """Quits the console
        """
        return True

    def emptyline(self):
        """This Function avoids the programm to be killed everytime
        a emptyline is typed in the command line
        """
        pass

    def do_create(self, arg):
        """Create new object:
        This method creates a new instance of a given class
        and stores the dictionary representation of that object
        in a file, if the arguments are not the ones specified,
        the program will not do anything.\n
        variables used:\n
        \t arg - will be the line of the command
        usage: create <Basemodel type>
        """
        Command = arg.split()
        if not Command:
            print("** class name missing **")
        elif Command[0] not in HBNBCommand.class_types:
            print("** class doesn't exist **")
        else:
            # for key, class_t in self.class_types.items():
            for key in HBNBCommand.class_types:
                if key == Command[0]:
                    new_instance = eval("{}()".format(Command[0]))
                    # new_instance = (class_t)
            print(new_instance.id)
            new_instance.save()

    def do_show(self, arg):
        """Show specific object:
        This method displays a human readable representation of
        an instance specified by the Basemodel type and the id
        of that same class\n
        variables used:\n
        \t arg - will be the line of the command
        usage: show <Basemodel Type> <id of the instance>"""
        Command = arg.split()
        if not Command:
            print("** class name missing **")
        elif Command[0] not in HBNBCommand.class_types:
            print("** class doesn't exist **")
        elif len(Command) == 1:
            print("** instance id missing **")
        else:
            objects = storage.all()
            instance_id = "{}.{}".format(Command[0], Command[1])
            if instance_id not in objects.keys():
                print("** no instance found **")
            else:
                [print(val) for key, val in
                 objects.items() if instance_id in key]

    def do_destroy(self, arg):
        """Destroy specific object:
        This method deletes an object (specified by the name of a Class
        along with the id of that same class) of the file storing every object
        created\n
        variables used:\n
        \t arg - will be the line of the command
        usage: destroy <Basemodel Type> <id of the instance>"""
        Command = arg.split()
        if not Command:
            print("** class name missing **")
        elif Command[0] not in self.class_types:
            print("** class doesn't exist **")
        elif len(Command) == 1:
            print("** instance id missing **")
        else:
            objects = storage.all()
            instance_id = "{}.{}".format(Command[0], Command[1])
            if instance_id not in objects.keys():
                print("** no instance found **")
            else:
                del objects[instance_id]
                storage.save()

    def do_all(self, arg):
        """Show all objects:
        This module prints a human readable representation of the
        of all the objects that have been created, if the Basemodel type
        is specified, then it will print all the objects created with
        that name module\n
        variables used:
        \t arg - will be the arguments used
        usage: all (<Basemodel type>)"""
        objects = storage.all()
        if arg:
            if arg not in HBNBCommand.class_types:
                print("** class doesn't exist **")
            else:
                print(["{}".format(val) for key, val in objects.items()
                       if arg == key.split(".")[0]])
        else:
            print([("{}".format(val)) for key, val in objects.items()])

    def do_update(self, arg):
        """Update objects
        This module sets new attributes to a given Basemodel with its
        specific id, the name of the attribute and the value, after that,
        the file with all the objects representations will be updated\n
        variables used:
        \t arg - will be the command line
        usage: update <BaseModel type> <Object id> <Attribute name> <Value>
        """
        Command = arg.split()
        if not Command:
            print("** class name missing **")
        elif Command[0] not in HBNBCommand.class_types:
            print("** class doesn't exist **")
        elif len(Command) == 1:
            print("** instance id missing **")
        elif len(Command) == 2:
            print("** attribute name missing **")
        elif len(Command) == 3:
            print("** value missing **")
        else:
            instance_id = "{}.{}".format(Command[0], Command[1])
            objects = storage.all()
            if instance_id not in objects.keys():
                print("** no instance found **")
            else:
                if Command[3].startswith("\"") and\
                   Command[3].endswith("\""):
                    Command[3] = Command[3][1:-1]
                if Command[3].isnumeric():
                    Command[3] = int(Command[3])
                setattr(objects[instance_id], Command[2], Command[3])
                storage.save()

if __name__ == '__main__':
    HBNBCommand().cmdloop()
