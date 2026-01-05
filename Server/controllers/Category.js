const Category = require("../models/Category");
const Course = require('../models/Course');
exports.createCategory = async (req, res) => {
	try {
		const { name, description } = req.body;
		if (!name) {
			return res
				.status(400)
				.json({ success: false, message: "All fields are required" });
		}
		const CategorysDetails = await Category.create({
			name: name,
			description: description,
		});
		console.log(CategorysDetails);
		return res.status(200).json({
			success: true,
			message: "Category Created Successfully",
		});
	} catch (error) {
		return res.status(500).json({
			success: true,
			message: error.message,
		});
	}
};

exports.showAllCategories = async (req, res) => {
	try {
		const allCategorys = await Category.find(
			{},
			{ name: true, description: true }
		);
		res.status(200).json({
			success: true,
			data: allCategorys,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};


/*

exports.categoryPageDetails = async (req, res) => {
    try {
      const { categoryId } = req.body
      console.log("PRINTING CATEGORY ID: ", categoryId);
      // Get courses for the specified category
      const selectedCategory = await Category.findById(categoryId)
        .populate({
          path: "courses",
          match: { status: "Published" },
          populate: "ratingAndReviews",
        })
        .exec()
  
      //console.log("SELECTED COURSE", selectedCategory)
      // Handle the case when the category is not found
      if (!selectedCategory) {
        console.log("Category not found.")
        return res
          .status(404)
          .json({ success: false, message: "Category not found" })
      }
      // Handle the case when there are no courses
      if (selectedCategory.courses.length === 0) {
        console.log("No courses found for the selected category.")
        return res.status(404).json({
          success: false,
          message: "No courses found for the selected category.",
        })
      }
  
      // Get courses for other categories
      const categoriesExceptSelected = await Category.find({
        _id: { $ne: categoryId },
      })
      let differentCategory = await Category.findOne(
        categoriesExceptSelected[getRandomInt(categoriesExceptSelected.length)]
          ._id
      )
        .populate({
          path: "courses",
          match: { status: "Published" },
        })
        .exec()
        //console.log("Different COURSE", differentCategory)
      // Get top-selling courses across all categories
      const allCategories = await Category.find()
        .populate({
          path: "courses",
          match: { status: "Published" },
          populate: {
            path: "instructor",
        },
        })
        .exec()
      const allCourses = allCategories.flatMap((category) => category.courses)
      const mostSellingCourses = allCourses
        .sort((a, b) => b.sold - a.sold)
        .slice(0, 10)
       // console.log("mostSellingCourses COURSE", mostSellingCourses)
      res.status(200).json({
        success: true,
        data: {
          selectedCategory,
          differentCategory,
          mostSellingCourses,
        },
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      })
    }
  }

*/



// exports.categoryPageDetails = async (req, res) => {
//   try {

//     const { categoryId } = req.body;
//     console.log("CATEGORY ID:", categoryId);

//     // 1️⃣ Category check
//     const selectedCategory = await Category.findById(categoryId);
//     if (!selectedCategory) {
//       return res.status(404).json({
//         success: false,
//         message: "Category not found",
//       });
//     }

//     // 2️⃣ Get courses DIRECTLY from Course collection
//     const selectedCategoryCourses = await Course.find({
//       category: categoryId,
//       status: "Published",
//     })
//       .populate("instructor")
//       .populate("ratingAndReviews");

//     if (selectedCategoryCourses.length === 0) {
//       return res.status(404).json({
//         success: false,
//         message: "No courses found for this category",
//       });
//     }

//     // 3️⃣ Different category
//     const categoriesExceptSelected = await Category.find({
//       _id: { $ne: categoryId },
//     });

//     let differentCategory = null;
//     if (categoriesExceptSelected.length > 0) {
//       const randomIndex = Math.floor(
//         Math.random() * categoriesExceptSelected.length
//       );
//       const randomCategory = categoriesExceptSelected[randomIndex];

//       const randomCategoryCourses = await Course.find({
//         category: randomCategory._id,
//         status: "Published",
//       });

//       differentCategory = {
//         ...randomCategory.toObject(),
//         courses: randomCategoryCourses,
//       };
//     }

//     // 4️⃣ Most selling courses
//     const mostSellingCourses = await Course.find({ status: "Published" })
//       .sort({ sold: -1 })
//       .limit(10)
//       .populate("instructor");

//     return res.status(200).json({
//       success: true,
//       data: {
//         selectedCategory: {
//           ...selectedCategory.toObject(),
//           courses: selectedCategoryCourses,
//         },
//         differentCategory,
//         mostSellingCourses,
//       },
//     });
//   } catch (error) {
//     console.error("CATEGORY PAGE ERROR:", error);
//     return res.status(500).json({
//       success: false,
//       message: "Internal server error",
//       error: error.message,
//     });
//   }
// };



exports.categoryPageDetails = async (req, res) => {
  try {
    const { categoryId } = req.body;

    /* ================== 1️⃣ SELECTED CATEGORY ================== */
    const selectedCategory = await Category.findById(categoryId)
      .populate({
        path: "courses",
        match: { status: "Published" },
        populate: [
          { path: "instructor", select: "firstName lastName image" },
          {
            path: "courseContent",
            populate: { path: "subSection" },
          },
          { path: "ratingAndReviews" },
        ],
      });

    if (!selectedCategory) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    /* ================== 2️⃣ MOST SELLING COURSES ================== */
    const mostSellingCourses = await Course.find({
      status: "Published",
    })
      .sort({ studentsEnrolled: -1 }) // selling = max enrollments
      .limit(10)
      .populate("instructor");

    /* ================== 3️⃣ DIFFERENT CATEGORY ================== */
    const otherCategories = await Category.find({
      _id: { $ne: categoryId },
    });

    let differentCategory = null;

    if (otherCategories.length > 0) {
      const randomIndex = Math.floor(
        Math.random() * otherCategories.length
      );

      const randomCategory = otherCategories[randomIndex];

      const randomCategoryCourses = await Course.find({
        category: randomCategory._id,
        status: "Published",
      }).populate("instructor");

      differentCategory = {
        ...randomCategory.toObject(),
        courses: randomCategoryCourses,
      };
    }

    /* ================== FINAL RESPONSE ================== */
    return res.status(200).json({
      success: true,
      data: {
        selectedCategory,
        mostSellingCourses,
        differentCategory,
      },
    });

  } catch (error) {
    console.error("CATEGORY PAGE ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

