const mongoose = require('mongoose');
const express = require('express');
const app = express();
const morgan = require('morgan');
const { urlencoded, json } = require('body-parser');
const noteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  body: {
    type: String,
    minlength: 10
  }
});

const Note = mongoose.model('note', noteSchema);

app.use(morgan('dev'));
app.use(urlencoded({ extended: true }));
app.use(json());

app.get('/note', async (req, res) => {
  // find all notes, grabs second set of 10. skip skips first 10 and limit just grabs next 10
  // .sort .skip(10) .limit(10)
  // .lean() will just use json, won't build mongoose object, more performant to just use json
  const notes = await Note.find({})
    .lean()
    .exec();
  res.status(200).json(notes);
});

app.post('/note', async (req, res) => {
  const noteToBeCreated = req.body;
  const note = await Note.create(noteToBeCreated);
  res.status(201).json(note.toJSON()); // toJSON() does the same as lean, can't be doene before as we use create
});

// findOne
// findById

const connect = () => {
  // type: mongodb and location, return a promise
  return mongoose.connect('mongodb://localhost:27017/whatever');
};

// create a schema
// const student = new mongoose.Schema({
//   firstName: {
//     type: String,
//     required: true,
//     unique: true
//   },
//   faveFoods: [{ type: String }],
//   info: {
//     school: {
//       type: String
//     },
//     showSize: {
//       type: Number
//     }
//   },
//   school: {
//     type: mongoose.Schema.Types.ObjectId,
//     required: true,
//     ref: 'school'
//   }
// });

// // nested model
// const school = new mongoose.Schema({
//   district: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'district'
//   },
//   name: {
//     type: String
//   },
//   openSince: Number,
//   students: Number,
//   isGreat: Boolean,
//   staff: [{ type: String }]
// });

// // need to use function not arrow
// school.virtual('staffCount').get(function() {
//   console.log('in virtual');
//   return this.staff.length;
// });

// school.pre('save', function() {
//   console.log('before save');
// });

// school.pre('findOne', function() {
//   console.log('before save');
// });

// // make name unique per district. Different districts can have the same have name school
// // order matters name is within district. Pair must be unique
// school.index(
//   {
//     district: 1,
//     name: 1
//   },
//   { unique: true }
// );

// // after save
// school.post('save', function(doc, next) {
//   setTimeout(() => {
//     console.log('after save ', doc);
//     next();
//   }, 300);
// });

// // indexes, constant time lookup
// // {
// //   key: 'value'
// // }

// const School = mongoose.model('school', school);

// // create mongoose model, models start with Captial letters(recommended)
// const Student = mongoose.model('student', student);

// connect to database
connect()
  .then(async connection => {
    app.listen(5000);
    // const mySchool = await School.create({
    //   name: 'myschool',
    //   staff: ['a', 'b', 'c']
    // });
    // console.log(mySchool.staffCount);
    // find it and if not found create school, .exec on finds
    // const schoolConfig = {
    //   name: "mlk elementary",
    //   openSince: 2009,
    //   students: 1000,
    //   isGreat: true,
    //   staff: ["a", "b", "c"]
    // };
    // const school2 = {
    //   name: "Larry Middle School",
    //   openSince: 1980,
    //   students: 600,
    //   isGreat: false,
    //   staff: ["d", "e", "f"]
    // };
    // can pass array to create multiple
    // const schools = await School.create([schoolConfig, school2]);
    // // query
    // const match = await School.findOne({
    //   students: { $gt: 600, $lt: 800 },
    //   isGreat: true
    // }).exec();
    // // will know to look in array to find staff with b
    // const match2 = await School.find({
    //   staff: "b"
    // }).exec();
    // // $ is built in mongo query, sort by ascending for opensense
    // const match2 = await School.find({
    //   $in: { staff: ["a", "b", "c"] }
    // })
    //   .sort({ openSince: 1 })
    //   .limit(2)
    //   .exec();
    // upsert is what handles the creating one if not found
    // new will return record that is updated with new true
    // const school = await School.findOneAndUpdate(
    //   { name: "mlk elementary" },
    //   { name: "mlk elementary" },
    //   { upsert: true, new: true }
    // ).exec();
    // const student = await Student.create({
    //   firstName: "trisha",
    //   school: school._id
    // });
    // const student2 = await Student.create({
    //   firstName: "matt",
    //   school: school._id
    // });
    // populate will look for nested schemas like school
    // const match = await Student.findById(student.id)
    //   .populate("school")
    //   .exec();
    // console.log(match);
  })
  .catch(e => console.error(e));
