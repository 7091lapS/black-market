import mongoose from 'mongoose';

const PlanSchema = new mongoose.Schema({
    name: String,
    entryPoint: String,
    planTemplate: mongoose.Schema.Types.Mixed,
    planDetailsKeys: [String],
    laundryPlan: {}
});

// Plan's custom validation, name must be unique
PlanSchema.pre('save', true, function(next, done) {
    mongoose.models['Plan'].findOne({name: this.name})
    .then(plan => {
        console.log(plan);
        if (plan) {
            this.invalidate('name', 'name must be unique');
            done(new Error('name must be unique'));
        } else {
            done();
        }
    });
    next();
});

export const Plan = mongoose.model('Plan', PlanSchema);
