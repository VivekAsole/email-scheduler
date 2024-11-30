import agenda from '../config/agenda.js';
import { defineEmailJobs } from './emailJobs.js';

export const registerJobs = () => {
  defineEmailJobs(agenda);
};

export default agenda;