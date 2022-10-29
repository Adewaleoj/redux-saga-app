import {
  takeLatest,
  put,
  call,
  fork,
  all,
  take,
  delay,
} from "redux-saga/effects";
import {
  loadUsersSuccess,
  loadUsersError,
  createUserSuccess,
  createUserError,
  deleteUserSuccess,
  deleteUserError,
  updateUserSuccess,
  updateUserError,
  searchUserSuccess,
  searchUserError,
  filterUserSuccess,
  filterUserError,
  sortUserSuccess,
  sortUserError,
} from "./actions";
import {
  loadUsersApi,
  createUserApi,
  deleteUserApi,
  updateUserApi,
  searchUserApi,
  filterUserApi,
  sortUserApi,
} from "./api";

import * as types from "./actionType";

export function* onLoadUsersStartAsync({ payload: { start, end, currentPage }}) {
  try {
    const response = yield call(loadUsersApi, start, end);
    if (response.status === 200) {
      yield delay(500);
      yield put(loadUsersSuccess({users: response.data, currentPage }));
    }
  } catch (error) {
    yield put(loadUsersError(error.response.data));
  }
}

function* deleteUser(userId) {
  try {
    const response = yield call(deleteUserApi, userId);
    if (response.status === 200) {
      yield delay(500);
      yield put(deleteUserSuccess(userId));
    }
  } catch (error) {
    yield put(deleteUserError(error));
  }
}

function* onDeleteUserRequest() {
  while (true) {
    const { payload: id } = yield take(types.DELETE_USER_START);
    yield call(deleteUser, id);
  }
}
function* onSearchUserStartAsync({ payload: query }) {
  try {
    const response = yield call(searchUserApi, query);
    if (response.status === 200) {
      yield put(searchUserSuccess(response.data));
    }
  } catch (error) {
    yield put(searchUserError(error.response.data));
  }
}


function* onCreateUserStartAsync({ payload }) {
  try {
    const response = yield call(createUserApi, payload);
    console.log("responseCreate", response);
    if (response.status === 200) {
      yield put(createUserSuccess(response.data));
    }
  } catch (error) {
    yield put(createUserError(error));
  }
}

function* onUpdateUserStartAsync({ payload: { id, formValue } }) {
  try {
    const response = yield call(updateUserApi, id, formValue);
    if (response.status === 200) {
      yield put(updateUserSuccess(response.data));
    }
  } catch (error) {
    yield put(updateUserError(error));
  }
}

function* onFilterUserStartAsync({ payload: value }) {
  try {
    const response = yield call(filterUserApi, value);
    if (response.status === 200) {
      yield put(filterUserSuccess(response.data));
    }
  } catch (error) {
    yield put(filterUserError(error.response.data));
  }
}

function* onSortUserStartAsync({ payload: value }) {
  try {
    const response = yield call(sortUserApi, value);
    if (response.status === 200) {
      yield put(sortUserSuccess(response.data));
    }
  } catch (error) {
    yield put(sortUserError(error.response.data));
  }
}


export function* onLoadUsers() {
  yield takeLatest(types.LOAD_USERS_START, onLoadUsersStartAsync);
}

export function* onCreateUser() {
  yield takeLatest(types.CREATE_USER_START, onCreateUserStartAsync);
}

export function* onUpdateUser() {
  yield takeLatest(types.UPDATE_USER_START, onUpdateUserStartAsync);
}

export function* onSearchUser() {
  yield takeLatest(types.SEARCH_USER_START, onSearchUserStartAsync);
}

export function* onfilterUser() {
  yield takeLatest(types.FILTER_USER_START, onFilterUserStartAsync);
}

export function* onSortUser() {
  yield takeLatest(types.SORT_USER_START, onSortUserStartAsync);
}

const userSagas = [
  fork(onLoadUsers),
  fork(onCreateUser),
  fork(onDeleteUserRequest),
  fork(onUpdateUser),
  fork(onSearchUser),
  fork(onfilterUser),
  fork(onSortUser)
];

export default function* rootSaga() {
  yield all([...userSagas]);
}
