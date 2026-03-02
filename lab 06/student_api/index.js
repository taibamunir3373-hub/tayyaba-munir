// const mongoose = require("mongoose");

// mongoose.connect("mongodb://localhost:27017/student-api")
// .then(() => {
// console.log("Connected to MongoDB,successfully"); 
// })
// .catch(err=>{
//  console.log("Connection failed:", err); });
// const studentSchema = new mongoose.Schema({ 
// name: String, 
// age: Number, 
// grade: String 
// }); 
// const Student = mongoose.model('Student', studentSchema); 
// const newStudent = new Student({ 
// name: 'John Doe', 
// age: 20, 
// grade: 'A' 
// }); 
// newStudent.save() 
// .then(() => console.log('Student saved!')) 
// .catch(err => console.log('Error:', err));
// const mongoose = require('mongoose'); 
// mongoose.connect('mongodb://localhost:27017/labDB'); 
// const studentSchema = new mongoose.Schema({ 
// name: String, 
// age: Number,
// grade: String 
// }); 
// const Student = mongoose.model('Student', studentSchema); 
// // 1. Insert multiple students 
// const students = [ 
// { name: 'Alice', age: 21, grade: 'B' }, 
// { name: 'Bob', age: 22, grade: 'A' }, 
// { name: 'Charlie', age: 23, grade: 'C' } 
// ]; 
// Student.insertMany(students) 
// .then(() => console.log('Students inserted!')) 
// .catch(err => console.log('Error:', err)); 
// Student.findByIdAndDelete('69a545342ad13a7f18d07851')  // Replace with actual student ID 
// .then(() => console.log('Student deleted!')) 
// .catch(err => console.log('Error:', err)); 
// // 2. Read and display all students 
// Student.find() 
// .then(students => console.log('All Students:', students)) 
// .catch(err => console.log('Error:', err)); 
// // 3. Update a student’s grade 
// Student.updateOne({ name: 'Alice' }, { $set: { grade: 'A+' } }) 
// .then(() => console.log('Student updated!')) 
// .catch(err => console.log('Error:', err)); 
// const studentSchema = new mongoose.Schema({ 
// name: { type: String, required: true }, 
// age: { type: Number, required: true, min: 18, max: 60 }, 
// grade: { type: String, required: true }
// }); 
// const Student = mongoose.model('Student', studentSchema); 
// const newStudent = new Student({ 
// name: 'Tayyaba', 
// age: 16,  // Invalid age, should be >=18 
// grade: 'A' 
// }); 
// newStudent.save() 
// .then(() => console.log('Student saved!')) 
// .catch(err => console.log('Validation Error:', err)); 
// const mongoose = require('mongoose'); 
// mongoose.connect('mongodb://localhost:27017/labDB'); 
// // Course Schema 
// const courseSchema = new mongoose.Schema({ 
// name: String, 
// duration: String 
// }); 
// const Course = mongoose.model('Course', courseSchema); 
// // Student Schema with reference to Course 
// const studentSchema = new mongoose.Schema({ 
// name: String, 
// age: Number, 
// grade: String, 
// enrolledCourse: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' } 
// }); 
// const Student = mongoose.model('Student', studentSchema); 
// // Create a new course and student
// const newCourse = new Course({ name: 'Mathematics', duration: '6 months' }); 
// newCourse.save() 
// .then(course => { 
// const newStudent = new Student({ 
// name: 'John Doe', 
// age: 20, 
// grade: 'A', 
// enrolledCourse: course._id 
// }); 
// return newStudent.save(); 
// }) 
// .then(student => console.log('Student with course:', student)) 
// .catch(err => console.log('Error:', err)); 
// // Populate course info when querying student 
// Student.findOne({ name: 'John Doe' }) 
// .populate('enrolledCourse') 
// .then(student => console.log('Student with populated course:', student)) 
// .catch(err => console.log('Error:', err)); 
// index.js 
// const mongoose = require('mongoose'); 
// mongoose.connect('mongodb://localhost:27017/labDB'); 
// const studentSchema = new mongoose.Schema({ 
// name: String, 
// age: Number, 
// grade: String 
// }); 
// const Student = mongoose.model('Student', studentSchema); 
// // 1. Retrieve students who have grade "A" 
// Student.find({ grade: 'A' }) 
// .then(students => console.log('Grade A Students:', students)) 
// .catch(err => console.log('Error:', err)); 
// // 2. Sort students by age in descending order 
// Student.find().sort({ age: -1 }).then(students => console.log('Sorted by Age (Desc):', students)) 
// .catch(err => console.log('Error:', err)); 
// // 3. Limit the result to 3 students 
// Student.find().limit(3) 
// .then(students => console.log('Limited to 3 students:', students)) 
// .catch(err => console.log('Error:', err)); 
//lab task 01
const mongoose = require("mongoose");
// ---------------- CONNECT TO MONGODB ----------------
mongoose.connect("mongodb://127.0.0.1:27017/productDB")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));
// ---------------- PRODUCT SCHEMA ----------------
const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  category: String,
  inStock: Boolean
});
// ---------------- PRODUCT MODEL ----------------
const Product = mongoose.model("Product", productSchema);
// ---------------- CREATE PRODUCT ----------------
async function createProduct() {
  const product = new Product({
    name: "Laptop",
    price: 80000,
    category: "electronics",
    inStock: true
  });
  await product.save();
  console.log("✅ Product Added:", product);
}
// ---------------- READ ALL PRODUCTS ----------------
async function readProducts() {
  const products = await Product.find();
  console.log("📦 All Products:");
  console.log(products);
}
// ---------------- UPDATE PRODUCT ----------------
async function updateProduct(name) {
  const updated = await Product.updateOne(
    { name: name },
    {
      $set: {
        price: 75000,
        category: "computers"
      }
    }
  );

  console.log("✏️ Product Updated:", updated);
}
// ---------------- DELETE PRODUCT ----------------
async function deleteProduct(name) {
  const deleted = await Product.deleteOne({ name: name });

  console.log("🗑️ Product Deleted:", deleted);
}
// ---------------- FIND BY CATEGORY ----------------
async function findProductByCategory(category) {
  const products = await Product.find({ category: category });

  console.log(`🔍 Products in "${category}" category:`);
  console.log(products);
}
// ---------------- MAIN FUNCTION ----------------
async function main() {
  await createProduct();               // Create
  await readProducts();                // Read
  await updateProduct("Laptop");       // Update
  await readProducts();                // Read again
  await findProductByCategory("computers"); // Find by category
  await deleteProduct("Laptop");       // Delete
  await readProducts();                // Final Read
  mongoose.connection.close();         // Close DB
}
main();