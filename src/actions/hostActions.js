import axios from "axios";
import { UPDATE_FOOD_FAIL } from "./guestActions";

export const CREATE_EVENT_START = "CREATE_EVENT_START";
export const CREATE_EVENT_SUCCESS = "CREATE_EVENT_SUCCESS";
export const CREATE_EVENT_FAIL = "CREATE_EVENT_FAIL";

export const ADD_FOOD_START = "ADD_FOOD_START";
export const ADD_FOOD_SUCCESS = "ADD_FOOD_SUCCESS";
export const ADD_FOOD_FAIL = "ADD_FOOD_FAIL";

export const ADD_GUEST_START = "ADD_GUEST_START";
export const ADD_GUEST_SUCCESS = "ADD_GUEST_SUCCESS";
export const ADD_GUEST_FAIL = "ADD_GUEST_FAIL";

export const UPDATE_EVENT_START = "UPDATE_EVENT_START";
export const UPDATE_EVENT_SUCESS = "UPDATE_EVENT_SUCESS";
export const UPDATE_EVENT_FAIL = "UPDATE_EVENT_FAIL";

export const UPDATE_FOOD_START = "UPDATE_FOOD_START";
export const UPDATE_FOOD_SUCCESS = "UPDATE_FOOD_SUCCESS";
export const UDPATE_FOOD_FAIL = "UPDATE_FOOD_FAIL";

export const UDPATE_GUEST_START = "UDPATE_GUEST_START";
export const UPDATE_GUEST_SUCCESS = "UPDATE_GUEST_SUCCESS";
export const UDPATE_GUEST_FAIL = "UDPATE_GUEST_FAIL";

export const DELETE_EVENT_START = "DELETE_EVENT_START";
export const DELETE_EVENT_SUCESS = "DELETE_EVENT_SUCESS";
export const DELETE_EVENT_FAIL = "DELETE_EVENT_FAIL";

export const DELETE_FOOD_START = "DELETE_FOOD_START";
export const DELETE_FOOD_SUCCESS = "DELETE_FOOD_SUCCESS";
export const DELETE_FOOD_FAIL = "DELETE_FOOD_FAIL";

export const DELETE_GUEST_START = "DELETE_GUEST_START";
export const DELETE_GUEST_SUCCESS = "DELETE_GUEST_SUCCESS";
export const DELETE_GUEST_FAIL = "DELETE_GUEST_FAIL";


const addFood = (id, food) => (dispatch) => {

  dispatch({ action: ADD_FOOD_START });
  axios
    .post(
      `https://lre-notapotluck.herokuapp.com/foods/potluck/${id}/food/${food.foodname}`,
      food
    )
    .then((res) => dispatch({ action: ADD_FOOD_SUCCESS, payload: res.data }))
    .catch((e) => dispatch({ action: ADD_FOOD_FAIL }));
};

const updateFood = (id, food) => (dispatch) => {
  dispatch({action: UPDATE_FOOD_START})
  dispatch({action: UPDATE_FOOD_SUCCESS})
  dispatch({action: UPDATE_FOOD_FAIL})
}

const updateGuest = (id, guest) => (dispatch)=>{
  dispatch({action: UDPATE_GUEST_START})
  dispatch({action: UPDATE_GUEST_SUCCESS})
  dispatch({action: UDPATE_GUEST_FAIL})
}

const addGuest = (id, guest) => (dispatch) => {
  dispatch({ action: ADD_GUEST_START });
  axios
    .post(`https://lre-notapotluck.herokuapp.com/guests/potluck/${id}/${guest.fname}/${guest.lname}/${guest.primaryemail}`, guest)
    .then((res) => dispatch({ action: ADD_FOOD_SUCCESS, payload: res.data }))
    .catch((e) => dispatch({ action: ADD_FOOD_FAIL, payload: `${e}` }));
};
export const createEvent = (data) => async (dispatch) => {
  dispatch({ action: CREATE_EVENT_START });
  axios
    .post("https://lre-notapotluck.herokuapp.com/potlucks/potluck", data)
    .then(async (res) => {
      await dispatch({ action: CREATE_EVENT_SUCCESS, payload: res.data });
      await res.data.foods.map((food) => addFood(res.data.potluckid, food));
      await res.data.guests.map((guest) => addGuest(res.data.potluckid, guest));
    })
    .catch((e) => dispatch({ action: CREATE_EVENT_FAIL, payload: `${e}` }));
};


export const updateEvent = (id, data) => async(dispatch) => {
  dispatch({ action: UPDATE_EVENT_START });
  axios
    .put(`https://lre-notapotluck.herokuapp.com/potlucks/potluck/${id}`, data)
    .then(async (res) => {
      await dispatch({ action: CREATE_EVENT_SUCCESS, payload: res.data });
      await res.data.foods.map((food) => updateFood(res.data.potluckid, food));
      await res.data.guests.map((guest) => updateGuest(res.data.potluckid, guest));
    })
    .catch((e) => dispatch({ action: CREATE_EVENT_FAIL, payload: `${e}` }));
};


export const deleteEvent = (id) => (dispatch) => {
  dispatch({ action: DELETE_EVENT_START });
  axios
    .delete(`https://lre-notapotluck.herokuapp.com/potlucks/potluck/${id}`)
    .then((res) => dispatch({ action: DELETE_EVENT_SUCESS }))
    .catch((e) => dispatch({ action: DELETE_EVENT_FAIL, payload: `${e}` }));
};
