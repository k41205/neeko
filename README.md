[![Netlify Status](https://api.netlify.com/api/v1/badges/0618e3ee-7cd9-4955-a111-fc3db214cfad/deploy-status)](https://app.netlify.com/sites/effervescent-cheesecake-896011/deploys)

To-do:

- rename container function
- edit field function
- delete field function

Other things I could implement:

- order container for total amount and data creation
- secure delete function for containers (ask you to digit the name of the container you are deleting)
- edit and delete container icons appearing on hover a container and need to create a hidden space on the top of the container where to put them in order to hover the container and be still able to click the icons without them disappearing.
- data validation rules on Firestore


APIs:
deleteData should accept type argument equal to string field or container, with container same thing, with field do a query on id field to find and delete it.
updateData should accept type argument equal to string, I need to see how it's work on Firestore.
