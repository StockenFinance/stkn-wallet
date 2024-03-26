import AsyncStorage from "@react-native-async-storage/async-storage";

export const Utils = {
  setStoreData: async (key, data) => {
    try {
      const stringifiedData = JSON.stringify(data);
      await AsyncStorage.setItem(key, stringifiedData);
    } catch (error) {
      console.log("Error storing data:", error);
    }
  },
  getStoreData: async (key) => {
    try {
      const storedValue = await AsyncStorage.getItem(key);
      if (storedValue !== null) {
        return JSON.parse(storedValue);
      }
    } catch (error) {
      console.log("Error retrieving data:", error);
    }
  },
  clearStoreData: async () => {
    try {
      await AsyncStorage.clear();
    } catch (error) {
      console.log("Error clearing AsyncStorage:", error);
    }
  },
  removeStorage: async (key) => {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error("Error removing value from AsyncStorage:", error);
    }
  },

  //   formatStoryData: (text) => {
  //     // let result = text?.replace(/[^\x20-\x7E]/gmi, '')
  //     // if (result?.split(':')?.length > 1) {
  //     //     return result?.split(':')[1]
  //     // } else {
  //     //     return result
  //     // }
  //     let result = text?.replace(
  //       /The title:|The Title:|The Title:|The Title :|title –|Title:-|Title :-|Title :|Title:|Title -|Title-|Title|title|Paragraph 1|Paragraph 2|Paragraph 3|Paragraph 4|Paragraph 5|Paragraph 6|Paragraph 7|Paragraph 1:|Paragraph 2:|Paragraph 3:|Paragraph 4:|Paragraph 5:|Paragraph 6:|Paragraph 7:|Paragraph/gi,
  //       ""
  //     );
  //     return result;
  //   },
};
