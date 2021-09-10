import axios from "axios";

const data = {
  "ticketState": "CLOSED"
};

export default {
  // Gets all spam items 
  getSpamItems: function () {
    return axios.get('/reports/get-spam-items');
  },
  
  //close given item
  resolveSpamItem: async function (id) {
    const res = await axios.put(`/reports/${id}`, data );
    return res;
  },
  
  //block given item
  blockSpamItem: async function (id) {
    console.log('myid', id);
    const res = await axios.put('/reports/block-spam-item', {id: id});
    return res;
  }
};
