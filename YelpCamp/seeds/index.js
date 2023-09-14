const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers')
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    //useCreateIndex: true,
    useUnifiedTopology: true
}); 

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database Connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for(let i = 0; i < 300; i++){
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '6448894a382135eb9903b2b4',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            //image: `https://source.unsplash.com/random/300x300?camping,${i}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit tempora ab, libero earum placeat laborum quam. Ab error doloremque eos nemo quasi facilis dolorem vitae. Dignissimos necessitatibus inventore molestiae possimus?',
            price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude
                ]
            },
            images: [
                {
                  url: 'https://res.cloudinary.com/dfsxmzu7i/image/upload/v1683260907/YelpCamp/h3jwadvaxtulalyiav34.jpg',
                  filename: 'YelpCamp/h3jwadvaxtulalyiav34'
                },
                {
                    url: 'https://res.cloudinary.com/dfsxmzu7i/image/upload/v1683261126/YelpCamp/mx65km0zmadmstuygjdb.jpg',
                    filename: 'YelpCamp/mx65km0zmadmstuygjdb'
                }
            ]
        })
        await camp.save();

    }
};

seedDB().then(() => {
    mongoose.connection.close();
});