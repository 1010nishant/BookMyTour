const express = require("express");
const reviewController = require("./../controllers/reviewController");
const {
    getAllTours,
    getTour,
    createTour,
    updateTour,
    deleteTour,
    aliasTopTours,
    getTourStats,
    getToursWithin,
    getMonthlyPlan,
    getDistances
} = require("./../controllers/tourController");
const reviewRouter = require('./../routes/reviewRoutes');
const { protect, restrictTo } = require('./../controllers/authController')

const router = express.Router();

router.use('/:tourId/reviews', reviewRouter);

router.route('/top-5-cheap').get(aliasTopTours, getAllTours)

router.route('/tour-stats').get(getTourStats)

router.route('/monthly-plan/:year').get(protect, restrictTo('admin', 'lead-guide'), getMonthlyPlan)

router
    .route('/tours-within/:distance/center/:latlng/unit/:unit')
    .get(getToursWithin);
// /tours-within?distance=233&center=-40,45&unit=mi
// /tours-within/233/center/-40,45/unit/mi

router.route('/distances/:latlng/unit/:unit').get(getDistances);

router.route("/").get(getAllTours).post(protect, restrictTo('admin', 'lead-guide'), createTour);

router
    .route("/:id")
    .get(getTour)
    .patch(protect, restrictTo('admin', 'lead-guide'), updateTour)
    .delete(protect, restrictTo('admin', 'lead-guide'), deleteTour);


router.route('/:tourId/reviews').post(protect, restrictTo('user'), reviewController.createReview);

module.exports = router;
