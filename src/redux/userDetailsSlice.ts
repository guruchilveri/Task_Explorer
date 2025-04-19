import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface UserDetailsState {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  age: number;
  gender: string;
  country: string;
  city: string;
}

const initialState: UserDetailsState = {
  id: 0,
  name: 'Pranay',
  email: 'pranay@mailinator.com',
  phone: '',
  address: '',
  age: 0,
  gender: '',
  country: '',
  city: '',
};

export const userDetailsSlice = createSlice({
  name: 'userDetails',
  initialState,
  reducers: {
    setUserDetails(state, action: PayloadAction<UserDetailsState>) {
      return {
        ...state,
        ...action.payload,
      };
    },
    resetUserDetails(state) {
      state.name = initialState.name; // ✅ Reset only `name`, keep other fields unchanged
    },
    setUserEmail(state, action: PayloadAction<string>) {
      return {
        ...state,
        email: action.payload,
      };
    },
  },
});

export const { setUserDetails, resetUserDetails, setUserEmail } = userDetailsSlice.actions;

// Selector function
export const selectUserDetails = (state: { userDetails: UserDetailsState }) => state.userDetails;

export default userDetailsSlice.reducer;
