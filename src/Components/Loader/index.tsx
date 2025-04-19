import React from 'react';
import { View, ActivityIndicator, StyleSheet, Modal } from 'react-native';
import { ColorTheme } from '../../assets';
import AppStyles from '../../utils/AppStyles';

interface LoaderProps {
  isVisible: boolean;
}

const styles = StyleSheet.create({
  overlay: {
    ...AppStyles.container,
    ...AppStyles.center,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black background
  },
});

const Loader: React.FC<LoaderProps> = ({ isVisible }) => {
  return (
    <Modal transparent={true} visible={isVisible} animationType="fade">
      <View style={styles.overlay}>
        <ActivityIndicator size="large" color={ColorTheme.White} />
      </View>
    </Modal>
  );
};

export default Loader;
