import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
    TextInput,
    Image
} from "react-native";
import { useAppSelector } from "../../redux/hooks";
import { selectAllPets } from "../../redux/selectors/pets";
import { useDispatch } from "react-redux";
import { changeName } from "../../redux/actions/pets";
import theme from "../../styles/theme.style";
import style from '../../styles/components/home/PetComponentStyle.style';

const PetComponent = () => {
  const pet = useAppSelector(selectAllPets)[0];

    const xpStyle = StyleSheet.create({
        xp: {
            width: `${(pet.xp / pet.maxXp) * 100}%`,
            height: 20,
            borderRadius: 10,
            backgroundColor: theme["color-primary-200"],
            display: "flex",
            flexDirection: "row-reverse",
            alignItems: "center",
        },
    })

    const [changingName, toggleChangingName] = React.useState(false);
    const [name, changeName] = React.useState(pet.name);
    const dispatch = useDispatch();

    const handleChangeName = () => {
        if (name !== '') {
            console.log(changeName('Frank', 0))
            dispatch({ type: 'pet/changeName', payload: { name, index: 0 }});
        }

        toggleChangingName(false);
    }

    return (
      <View style={style.petContainer}>
      <Image source={require('../../../assets/doggo.jpeg')} style={{ marginRight: 20, height: 120, width: 120 }}/>
      <View style={style.container}>
        {!changingName ? (
          <View style={style.nameLine}>
            <View style={style.xpContainer}>
              <Text style={style.petName}>{pet.name}: </Text>
              <Text style={style.petLevel}>Level {pet.level}</Text>
            </View>
            <TouchableOpacity
              style={style.button}
              onPress={() => toggleChangingName(true)}
            >
              <Text style={style.petLevel}>Edit Name</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={style.nameLine}>
            <TextInput style={style.textInput} value={name} onChangeText={changeName}/>
            <TouchableOpacity
              style={style.button}
              onPress={() => handleChangeName()}
            >
              <Text style={style.petLevel}>Save</Text>
            </TouchableOpacity>
          </View>
        )}
      <View style={style.xpContainer}>
        <Text style={{ fontSize: 18 }}>XP: </Text>
        <View style={style.xpBar}>
          <View style={xpStyle.xp}>
            <Text style={style.xpNumber}>{pet.xp}</Text>
          </View>
          <Text style={style.xpNumber}>{pet.maxXp}</Text>
        </View>
      </View>
      </View>
        </View>
  );
};

export default PetComponent;
