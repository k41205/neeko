To-do:

- rename container function
- edit field function
- delete field function

Other things I could implement:

- secure delete function for containers (ask you to digit the name of the container you are deleting)
- edit and delete container icons appearing on hover a container and need to create a hidden space on the top of the container where to put them in order to hover the container and be still able to click the icons without them disappearing.
- data validation rules on Firestore


APIs:
deleteData should accept type argument equal to string field or container, with container same thing, with field do a query on id field to find and delete it.
updateData should accept type argument equal to string, I need to see how it's work on Firestore.