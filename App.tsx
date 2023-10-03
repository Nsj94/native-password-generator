import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  View,
  ImageBackground,
  Dimensions,
} from 'react-native';
import React, {useState} from 'react';
import * as Yup from 'yup';
import {Formik} from 'formik';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const PasswordSchema = Yup.object().shape({
  passwordLength: Yup.number()
    .min(4, 'Should be atleast 4 characters')
    .max(16, 'Max of 16 Char')
    .required('Length is required'),
});

export default function App() {
  const [password, setPassword] = useState('');
  const [isPasswordGenerated, setIsPasswordGenerated] = useState(false);

  const [lowerCase, setLowerCase] = useState(true);
  const [upperCase, setUpperCase] = useState(false);
  const [useNumbers, setUseNumbers] = useState(false);
  const [useSymbols, setUseSymbols] = useState(false);

  const generatePassword = (passwordLen: number) => {
    let characterList = '';

    const upperCaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowerCaseChars = 'abcdefghijklmopqrstuvwxyz';
    const specialChars = '!@#$%^&*()_+';
    const numbersChars = '1234567890';

    if (lowerCase) {
      characterList += lowerCaseChars;
    }
    if (upperCase) {
      characterList += upperCaseChars;
    }
    if (useSymbols) {
      characterList += specialChars;
    }
    if (useNumbers) {
      characterList += numbersChars;
    }

    let passwordResult = createPassword(characterList, passwordLen);
    console.log(passwordResult + 'hello');

    setPassword(passwordResult);
    setIsPasswordGenerated(true);
  };

  const createPassword = (characters: string, passwordLen: number) => {
    let result = '';
    for (let i = 0; i < passwordLen; i++) {
      const characterIndex = Math.round(Math.random() * characters.length);
      result += characters.charAt(characterIndex);
    }
    return result;
  };
  const resetPassword = () => {
    setPassword('');
    setIsPasswordGenerated(false);
    setLowerCase(true);
    setUpperCase(false);
    setUseNumbers(false);
    setUseSymbols(false);
  };

  return (
    <ScrollView keyboardShouldPersistTaps="always">
      <SafeAreaView style={styles.appContainer}>
        <ImageBackground
          source={require('./assests/bg.jpg')}
          resizeMode="cover"
          style={styles.image}>
          <Text style={styles.title}>Password Generator</Text>
          <View style={styles.formContainer}>
            <Formik
              initialValues={{passwordLength: ''}}
              validationSchema={PasswordSchema}
              onSubmit={values => {
                console.log(values);
                generatePassword(+values.passwordLength);
              }}>
              {({
                values,
                errors,
                touched,
                isValid,
                handleChange,
                handleSubmit,
                handleReset,
                /* and other goodies */
              }) => (
                <>
                  <View style={styles.inputWrapper}>
                    <View style={styles.inputColumn}>
                      <Text style={styles.heading}>Password Length</Text>
                      {touched.passwordLength && errors.passwordLength && (
                        <Text style={styles.errorText}>
                          {errors.passwordLength}
                        </Text>
                      )}
                    </View>
                    <TextInput
                      style={styles.inputStyle}
                      value={values.passwordLength}
                      onChangeText={handleChange('passwordLength')}
                      placeholder="Ex. 8 "
                      keyboardType="numeric"
                    />
                  </View>
                  <View style={styles.inputWrapper}>
                    <Text style={styles.heading}>Include LowerCase</Text>
                    <BouncyCheckbox
                      disableBuiltInState
                      isChecked={lowerCase}
                      onPress={() => setLowerCase(!lowerCase)}
                      fillColor="#29A887"
                    />
                  </View>
                  <View style={styles.inputWrapper}>
                    <Text style={styles.heading}>Include Uppercase</Text>
                    <BouncyCheckbox
                      fillColor="#29A887"
                      isChecked={upperCase}
                      onPress={() => setUpperCase(!upperCase)}
                    />
                  </View>
                  <View style={styles.inputWrapper}>
                    <Text style={styles.heading}>Include Numbers</Text>
                    <BouncyCheckbox
                      fillColor="#29A887"
                      isChecked={useNumbers}
                      onPress={() => setUseNumbers(!useNumbers)}
                    />
                  </View>
                  <View style={styles.inputWrapper}>
                    <Text style={styles.heading}>Include Symbols</Text>
                    <BouncyCheckbox
                      fillColor="#29A887"
                      isChecked={useSymbols}
                      onPress={() => setUseSymbols(!useSymbols)}
                    />
                  </View>
                  <View style={styles.formActions}>
                    <TouchableOpacity
                      disabled={!isValid}
                      style={styles.primaryBtn}
                      onPress={handleSubmit}>
                      <Text style={styles.primaryBtnTxt}>Generate</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.secondaryBtn}
                      onPress={() => {
                        handleReset();
                        resetPassword();
                      }}>
                      <Text style={styles.secondaryBtnTxt}>Reset</Text>
                    </TouchableOpacity>
                  </View>
                </>
              )}
            </Formik>
          </View>
          {isPasswordGenerated ? (
            <View style={[styles.card, styles.cardElevated]}>
              <View style={styles.resultContainer}>
                <Text style={styles.subTitle}> Result</Text>
                <Text style={styles.description}> Long Press to Copy</Text>
              </View>
              <Text selectable style={styles.generatedPassword}>
                {' '}
                {password}
              </Text>
            </View>
          ) : null}
        </ImageBackground>
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
  },
  formContainer: {
    margin: 8,
    padding: 8,
  },
  image: {
    flex: 1,
    height: screenHeight,
    width: screenWidth,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 15,
    backgroundColor: '#A8B7F8',
    padding: 10,
    paddingLeft: 18,
    color: '#383838',
    borderBottomRightRadius: 30,
  },
  subTitle: {
    fontSize: 17,
    fontWeight: '600',
    marginBottom: 2,
    color: '#000',
  },
  description: {
    color: '#758283',
    fontSize: 12,
    marginBottom: 8,
  },
  heading: {
    fontSize: 16,
    color: '#000',
  },
  inputWrapper: {
    marginBottom: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  inputColumn: {
    flexDirection: 'column',
  },
  inputStyle: {
    padding: 8,
    width: '30%',
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#16213e',
    textAlign: 'center',
  },
  errorText: {
    fontSize: 14,
    color: '#ff0d10',
  },
  formActions: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  primaryBtn: {
    width: 120,
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 8,
    backgroundColor: '#A8B7F8',
    elevation: 10,
    shadowOffset: {
      width: 10,
      height: 10,
    },
    shadowColor: '#333',
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  primaryBtnTxt: {
    color: '#383838',
    textAlign: 'center',
    fontWeight: '500',
  },
  secondaryBtn: {
    width: 120,
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 8,
    backgroundColor: '#F2F2F2',
    elevation: 10,
    shadowOffset: {
      width: 10,
      height: 10,
    },
    shadowColor: '#333',
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  secondaryBtnTxt: {
    textAlign: 'center',
  },
  card: {
    padding: 12,
    borderRadius: 6,
    marginHorizontal: 12,
  },
  cardElevated: {
    backgroundColor: '#ffffff',
    elevation: 10,
    shadowOffset: {
      width: 10,
      height: 10,
    },
    shadowColor: '#333',
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  generatedPassword: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 12,
    color: '#000',
  },
  resultContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
