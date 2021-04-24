import mongoose from 'mongoose';
mongoose.connect('mongodb://localhost/cramdb', {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'db connection error: '));
db.once('open', () => {
  console.log('connected to mongoose');
});

const topicSchema = new mongoose.Schema({
  title:{
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  related: {
    type: [String],
    require: true
  }
});

export const Topic = mongoose.model('Topic', topicSchema);