const Boom = require('boom');
const Dog = require('../../../models/dog');

class DogController {

  /**
   * List Dogs
   */
  list (req, h) {
    return Dog.find({}).exec().then((dog) => {
      return dog;
    }).catch((err) => {
      return Boom.badRequest(err)
    });
  }

  /**
   * Get Dog by ID
   */
  get (req, h) {
    return Dog.findById(req.params.id).exec().then((dog) => {
      if (!dog) return Boom.notFound('Dog Not Found')
      return { dog: dog };
    }).catch((err) => {
      return Boom.badRequest(err)
    });
  }


  /**
   * POST a Dog
   */
  create (req, h) {

    const dogData = {
      name: req.payload.name,
      breed: req.payload.breed,
      age: req.payload.age,
      image: req.payload.image
    };

    return Dog.create(dogData).then((dog) => {
      return { message: 'Dog created successfully', dog: dog };
    }).catch((err) => {
      return Boom.badRequest(err)
    });
  }

  /**
   * PUT | Update Dog by ID
   */
  async update (req, h) {

    const dog = await Dog.findById(req.params.id);

    if (!dog) return Boom.notFound('Dog not found', {
      id: req.params.id,
    });

    dog.set({
      name: req.payload.name,
      breed: req.payload.breed,
      age: req.payload.age,
      image: req.payload.image
    });
    return dog.save().then((product, err) => {
      if (err) return Boom.badRequest(err)
      console.log('err  ', err);
      console.log('dog', dog);
      return { message: 'Dog data updated successfully', dog: dog };
    });
  }

  /**
   * Delete Dog by ID
   */
  async remove (req, h) {

    const dog = await Dog.findById(req.params.id);

    if (!dog) return Boom.notFound('Dog not found', {
      id: req.params.id,
    });

    return dog.remove().then(function (dog) {
      return { success: true, dog: dog };
    }).catch(function(err) {
      if (err) return Boom.badImplementation(err);
    })
  }
}

exports = module.exports = new DogController();