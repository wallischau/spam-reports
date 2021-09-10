import axios from "axios";

const data = {
  "ticketState": "CLOSED"
};

export default {
  // Gets all items 
  getSpamItems: function () {
    return axios.get('/reports/get-spam-items');
  },
  resolveSpamItem: async function (id, body) {
    const res = await axios.put(`/reports/${id}`, data );
    return res;
  },
  blockSpamItem: async function (id) {
    console.log('myid', id);
    const res = await axios.put('/reports/block-spam-item', {id: id});
    return res;
  }
};
