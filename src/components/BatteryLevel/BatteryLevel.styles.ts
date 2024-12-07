import {StyleSheet} from 'react-native';

const PADDING = 2;

export const styles = StyleSheet.create({
  container: {
    width: 200,
    height: 90,
    borderWidth: 8,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    padding: PADDING,
  },
  outContainer: {
    width: 10,
    height: 40,
    backgroundColor: 'black',
    position: 'absolute',
    right: -18,
    borderTopRightRadius: 3,
    borderBottomRightRadius: 3,
    top: 17,
  },
  charge: {
    position: 'absolute',
    backgroundColor: 'limegreen',
    left: PADDING,
    top: PADDING,
    bottom: PADDING,
  },
  warningCharge: {
    backgroundColor: 'orangered',
  },
  levelText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  errorText: {
    color: 'orangered',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
