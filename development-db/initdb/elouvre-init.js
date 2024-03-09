// Initialize database
db = db.getSiblingDB("elouvredb");

// Create collection
db.createCollection("artists");

// Create collection
db.createCollection("users");

// Insert initial data
db.artists.insert([
    {
      "_id": ObjectId("65a3bec69347e54b34349291"),
      "firstName": "Pablo",
      "surname": "Picasso",
      "birthday": "1881-10-25T00:00:00.000Z",
      "nationality": "Spanish",
      "website": "https://www.picasso.com",
      "instagram": "pablo_picasso",
      "biography": "Pablo Picasso was a Spanish painter, sculptor, printmaker, ceramicist, and stage designer who spent most of his adult life in France.",
      "stars": 3
    },
    {
      "_id": ObjectId("65a3bec69347e54b34349292"),
      "firstName": "Vincent",
      "surname": "van Gogh",
      "birthday": "1853-03-30T00:00:00.000Z",
      "nationality": "Dutch",
      "website": "https://www.vangoghgallery.com",
      "instagram": "vincentvangogh",
      "biography": "Vincent van Gogh was a Dutch post-impressionist painter who is among the most famous and influential figures in the history of Western art.",
      "stars": 4
    },
    {
      "_id": ObjectId("65a3bec69347e54b34349293"),
      "firstName": "Frida",
      "surname": "Kahlo",
      "birthday": "1907-07-06T00:00:00.000Z",
      "nationality": "Mexican",
      "website": "https://www.fridakahlo.org",
      "instagram": "fridakahlo",
      "biography": "Frida Kahlo was a Mexican painter known for her many portraits, self-portraits, and works inspired by the nature and artifacts of Mexico.",
      "stars": 5
    },
    {
      "_id": ObjectId("65a3bec69347e54b34349294"),
      "firstName": "Theo",
      "surname": "Peifer",
      "birthday": "2023-11-09T00:00:00.000Z",
      "nationality": "Greek",
      "website": "https://www.example.com",
      "instagram": "",
      "biography": "",
      "stars": 4
    },
    {
      "_id": ObjectId("65a3bec69347e54b34349295"),
      "firstName": "Georgia",
      "surname": "O'Keeffe",
      "birthday": "1887-11-15T00:00:00.000Z",
      "nationality": "American",
      "website": "https://www.okeeffemuseum.org",
      "instagram": "georgiaokeeffe",
      "biography": "Georgia O'Keeffe was an American modernist artist. She was known for her paintings of enlarged flowers, New York skyscrapers, and New Mexico landscapes.",
      "stars": 2
    },
    {
      "_id": ObjectId("65a3bec69347e54b34349296"),
      "firstName": "Salvador",
      "surname": "Dalí",
      "birthday": "1904-05-11T00:00:00.000Z",
      "nationality": "Spanish",
      "website": "https://www.salvadordali.org",
      "instagram": "salvadordali",
      "biography": "Salvador Dalí was a Spanish surrealist artist renowned for his technical skill, precise draftsmanship, and the striking and bizarre images in his work.",
      "stars": 3
    },
    {
      "_id": ObjectId("65a3bec69347e54b34349297"),
      "firstName": "Claude",
      "surname": "Monet",
      "birthday": "1840-11-14T00:00:00.000Z",
      "nationality": "French",
      "website": "https://www.claudemonetgallery.org",
      "instagram": "claudemonet",
      "biography": "Claude Monet was a founder of French Impressionist painting, and the most consistent and prolific practitioner of the movement's philosophy of expressing one's perceptions before nature.",
      "stars": 5
    }
  ]);