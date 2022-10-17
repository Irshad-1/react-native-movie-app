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
const Section = ({children, title}) => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
};

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const [text, setText] = React.useState('');
  const [data, setData] = React.useState({});

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const searchMovie = async () => {
    let url = `https://www.omdbapi.com/?t=${text}&apikey=c82dc22a`;
    let res = await fetch(url);
    res = await res.json();
    console.log('res', res);
    setData(res);
  };
  let timer;
  React.useEffect(() => {
    timer = setTimeout(searchMovieByLetters, 4000);
    return () => clearTimeout(timer);
  }, [text]);
  const searchMovieByLetters = async () => {
    console.log('text', text);
    let res = await fetch(
      `https://www.omdbapi.com/?&apikey=c82dc22a&s=${text}`,
    );
    res = await res.json();
    console.log(res.Search);
    setSearchData(res.Search);
  };

  const SearchDataDisplay = props => {
    return (
      <View>
        <Text>{props.item.Title}</Text>
        <Image
          source={{uri: props.item.Poster}}
          style={{width: 50, height: 50}}
          resizeMode="contain"
        />
      </View>
    );
  };

  return (
    <SafeAreaView
      contentInsetAdjustmentBehavior="automatic"
      style={backgroundStyle}>
      <Header />
      <View
        style={{
          backgroundColor: isDarkMode ? Colors.black : Colors.white,
        }}>
        <TextInput
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
        <FlatList
          data={searchData}
          style={{height: 400, position: 'absolute', top: 50}}
          renderItem={({item}) => {
            return <SearchDataDisplay key={item.key} item={item} />;
          }}
        />
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
