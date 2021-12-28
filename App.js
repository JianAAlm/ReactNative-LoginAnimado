import { StatusBar } from 'expo-status-bar';
import React,{useState,useEffect} from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  KeyboardAvoidingView,
  Image, 
  TextInput, 
  TouchableOpacity,
  Animated,
Keyboard } from 'react-native';

export default function App() {
  const [offset]= useState(new Animated.ValueXY({x:0,y:95}));
  const [opacity]= useState(new Animated.Value(0));
  const [logo]= useState(new Animated.ValueXY({x:130,y:155}));
  useEffect(()=>{
    KeyboardDidShowListener=Keyboard.addListener('keyboardDidShow',keyboardDidShow);
    KeyboardDidHideListener=Keyboard.addListener('keyboardDidHide',keyboardDidHide);

    Animated.parallel([//rodar animações juntas
      Animated.spring(offset.y,{
        toValue:0,
        speed:4,
        bounciness:25,
      }),

      Animated.timing(opacity,{
        toValue:1,
        duration:200,
      })
    ]).start();

  },[]);

  function keyboardDidShow(){
    Animated.parallel([
      Animated.timing(logo.x,{
        toValue:55,
        duration:100,
      }),
      Animated.timing(logo.y,{
        toValue:65,
        duration:100,
      }),
    ]).start();
  }
  function keyboardDidHide(){
    Animated.parallel([
      Animated.timing(logo.x,{
        toValue:130,
        duration:100,
      }),
      Animated.timing(logo.y,{
        toValue:155,
        duration:100,
      }),
    ]).start();
  }

  return (
    <KeyboardAvoidingView style={styles.background}>
        <StatusBar barStyle="ligth-content"/>
      <View style={styles.containerLogo}>
        <Animated.Image 
        style={{width:logo.x, height:logo.y,}}
        source={require('./assets/logo.png')} />
      </View>

      <Animated.View 
      style={[
        styles.container,
        {
          opacity: opacity,
          transform:[
          {translateY:offset.y}
          ]
        }
      ]}
      >
        <TextInput
        style={styles.input}
        placeholder='Email'
        autoCorrect={false}
        onChangeText={()=>{}}
        />
        <TextInput
        style={styles.input}
        placeholder='Senha'
        autoCorrect={false}
        onChangeText={()=>{}}
        />

        <TouchableOpacity style={styles.btnSubmit}>
          <Text style={styles.submitText}>Acessar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnRegister}>
          <Text style={styles.registerText}>Criar conta gratuita</Text>
        </TouchableOpacity>
      </Animated.View>

    </KeyboardAvoidingView>
    
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#191919',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerLogo:{
    flex: 1,
    justifyContent: 'center',
  },
  container:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
  },
  input:{
    backgroundColor:'#fff',
    color: '#222',
    width: '90%',
    marginBottom:15,
    padding: 10,
    borderRadius:20,
    fontSize:17,
  },
  btnSubmit:{
    backgroundColor:'#12c28d',
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
    height:45,
    borderRadius:20,
  },
  submitText:{
    fontSize:17,
    color: '#fff',
  },
  btnRegister:{
    marginTop:10,
  },
  registerText:{
    color: '#fff',
  },
});
