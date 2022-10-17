/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useCallback, useMemo} from 'react';
import {debounce} from 'lodash';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  View,
  Image,
  FlatList,
  TouchableHighlight,
  Pressable,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

/* $FlowFixMe[missing-local-annot] The type annotation(s) required by Flow's
 * LTI update could not be added via codemod */

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const [display, setDisplay] = React.useState(false);
  const [text, onChangeText] = React.useState('');
  const [data, setData] = React.useState({});
  const [searchData, setSearchData] = React.useState([]);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const searchMovie = async () => {
    let url = `https://www.omdbapi.com/?t=${text}&apikey=c82dc22a`;
    let res = await fetch(url);
    res = await res.json();
    console.log('res', res);
    setData(res);
    setDisplay(false);
    onChangeText('');
  };
  let timer;
  React.useEffect(() => {
    timer = setTimeout(searchMovieByLetters, 2000);
    return () => clearTimeout(timer);
  }, [text]);
  const searchMovieByLetters = async () => {
    console.log('text', text);
    let res = await fetch(
      `https://www.omdbapi.com/?&apikey=c82dc22a&s=${text}`,
    );

    res = await res.json();
    if (res.Search) setDisplay(true);
    console.log(res.Search);
    setSearchData(res.Search);
  };

  const SearchDataDisplay = props => {
    return (
      <Pressable
        onPress={() => {
          setDisplay(false);
          onChangeText(props.item.title);
          searchMovie();
        }}
        underlayColor="white">
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            flex: 1,
            borderWidth: 0.5,
            borderColor: 'grey',
          }}>
          <Text style={{flex: 2}}>{props.item.Title}</Text>
          <Image
            source={{uri: props.item.Poster}}
            style={{width: 80, height: 80, flex: 0.5}}
            resizeMode="contain"
          />
        </View>
      </Pressable>
    );
  };

  return (
    <SafeAreaView
      contentInsetAdjustmentBehavior="automatic"
      style={backgroundStyle}>
      <View
        style={{
          backgroundColor: isDarkMode ? Colors.black : Colors.white,
        }}>
        <Text style={{textAlign: 'center', fontSize: 40, fontWeight: 'bold'}}>
          IMDB
        </Text>
        <TextInput
          style={{fontSize: 25}}
          value={text}
          onChangeText={te => {
            console.log('te', te);
            onChangeText(te);
          }}
          placeholder="Enter Movie Name"
          onSubmitEditing={searchMovie}
        />
        <Image
          source={{uri: data.Poster}}
          style={{width: 400, height: 500}}
          resizeMode="contain"
        />
        {console.log(display)}

        {display && (
          <FlatList
            data={searchData}
            style={{
              height: 300,
              position: 'absolute',
              top: 105,
              width: '95%',
              elevation: 2,
              backgroundColor: 'white',
            }}
            renderItem={({item}) => {
              return <SearchDataDisplay key={item.key} item={item} />;
            }}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
