import { useEffect,useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personService from "./services/persons";
import Notification from "./components/Notifications";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [showAll, setShowAll] = useState(true);
  const [successMsg, setSuccessMsg] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

   useEffect(() => {
     personService.getAll().then((initialNotes) => setPersons(initialNotes));
   }, []);

  const addPerson = (e) => {
    e.preventDefault();

    const newPerson = {
      name: newName,
      number: newNumber,
    };
    const personToUpdate = persons.find((p) => p.name === newPerson.name);

    if (personToUpdate) {
      if (personToUpdate.number != newPerson.number) {
        if (
          window.confirm(
            `${newPerson.name} already exists in phonebook. replace the old number with a new one ?`
          )
        )
          personService
            .update(personToUpdate.id, newPerson)
            .then((updatedPerson) => {
              setPersons(
                persons.map((p) =>
                  p.id === updatedPerson.id ? updatedPerson : p
                )
              );
              setSuccessMsg(`Updated ${newPerson.name} with new number`);
              setTimeout(() => setSuccessMsg(null), 5000);
            })

            .catch((error) => {
              console.log(error);
              setErrorMsg(
                `Information of ${personToUpdate.name} has already been removed from the server.`
              );
            });
      }

      setNewName("");
      setNewNumber("");
      return;
    }

    personService.create(newPerson).then((returnedPerson) => {
      setPersons(persons.concat(returnedPerson));
      setSuccessMsg(`Added ${newPerson.name}!`);
      setTimeout(() => setSuccessMsg(null), 5000);
    });

    setNewName("");
    setNewNumber("");
  };

  const handlePersonChange = (e) => {
    setNewName(e.target.value);
  };

  const handleNumberChange = (e) => setNewNumber(e.target.value);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    if (searchTerm != null) setShowAll(false);
  };

  const handleDelete = (id) => {
    const result = window.confirm("Do you want to delete ? ");
    if (result) {
      personService.deleteData(id).then(() => {
        setPersons(persons.filter((person) => person.id !== id));
      });
    }
  };

  const personsToShow = showAll
    ? persons
    : persons.filter((p) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
      );

  //console.log(personsToShow);

  return (
    <div>
      <Notification successMsg={successMsg} errorMsg={errorMsg} />
      <h2>Phonebook</h2>
      <Filter searchTerm={searchTerm} handleSearch={handleSearch} />
      <h2>Add a new</h2>
      <PersonForm
        addPerson={addPerson}
        handleNumberChange={handleNumberChange}
        handlePersonChange={handlePersonChange}
        newName={newName}
        newNumber={newNumber}
      />
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} handleDelete={handleDelete} />
    </div>
  );
};

export default App;
