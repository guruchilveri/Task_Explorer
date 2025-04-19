import React from 'react';
import { Button, Text, TextInput, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/rootReducer';
import { setUserDetails, resetUserDetails, setUserEmail } from '../../../redux/userDetailsSlice';
import { performLoginOperation } from '../../../api/services/LoginServices/loginServices';
import { debugLog } from '../../../Components';

const LoginScreen = () => {
    const dispatch = useDispatch();
    const userDetails = useSelector((state: RootState) => state.userDetails);

    const fetchData = async () => {
        try {
            const response = await performLoginOperation();
            if (response?.status === 200) {
                debugLog('FETCH DATA >> >> title >> > > ', response?.data.title);
            } else {
                debugLog('FETCH DATA >> >> title >> > > ', response?.status);
            }
        } catch (error) {
            debugLog('Error fetchData >> >> ', error);
        }
    };

    return (
        <View>
            <Text>{userDetails.name} - {userDetails.email}</Text>
            <TextInput
                onChangeText={(text) => {
                    const data = {
                        id: 0,
                        name: text,
                        email: 'ppppppp',
                        phone: '',
                        address: '',
                        age: 0,
                        gender: '',
                        country: '',
                        city: '',
                    };
                    dispatch(setUserDetails(data));
                }} />
            <Button
                title='Reset'
                onPress={() => dispatch(resetUserDetails())}
            />
            <Button
                title='Fetch Data'
                onPress={fetchData}
            />
            <TextInput
                onChangeText={(text) => {

                    dispatch(setUserEmail(text));
                }} />
        </View>
    );
};

export default LoginScreen;