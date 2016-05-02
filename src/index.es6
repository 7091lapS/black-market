import {openBlackMarket} from './black-market/blackMarket';
import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost:27017/black_market');
mongoose.set('debug', true);

openBlackMarket();
