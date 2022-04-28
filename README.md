To-do:

- delete a field of a container
- enable edit operation on click of label or name container

Other things I could implement:

- secure delete function for containers (ask you to digit the name of the container you are deleting)
- data validation rules on Firestore



Notes:

[element to add in the current structure]

div container > div container__header > h2 container__name ~ button [container__button--edit] container__button--remove

div container__stackElement 	> div container__stackElement--label ~ div container__stackElementDetails ~ div [container__stackElementEdit]

edit image to add in the assets directory

css modify:
.budget{
column-gap: 25px
}

APIs:
deleteData should accept type argument equal to string field or container, with container same thing, with field do a query on id field to find and delete it.
updateData should accept type argument equal to string, I need to see how it's work on Firestore.