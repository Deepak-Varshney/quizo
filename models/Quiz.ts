import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IQuiz extends Document {
  title: string;
  description: string;
  teacher: string; 
  createdAt: Date;
}

const QuizSchema: Schema = new Schema<IQuiz>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  teacher: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Quiz as Model<IQuiz> || mongoose.model<IQuiz>('Quiz', QuizSchema);
