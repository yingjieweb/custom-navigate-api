import { useState } from "react";
import Taro, { eventCenter } from "@tarojs/taro";
import { View, Text, Button } from "@tarojs/components";
import "./index.css";

export default function PageA() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  const navigateAndFetch = (url) => {
    return new Promise((resolve) => {
      eventCenter.once("formDataChange", (newFormData) => {
        resolve(newFormData);
      });
      Taro.navigateTo({ url });
    });
    // const newFormData = await promise;
    // return Promise.resolve(newFormData);
  };
  const handleClick = async () => {
    const url = `/pages/page-b/index?name=${formData.name}&email=${formData.email}`;
    const newFormData = await navigateAndFetch(url);
    setFormData(newFormData);
  };

  return (
    <View className='page-a'>
      <Text>Navigate Page B And Fetch Form Data</Text>
      <View className='divider'></View>
      <Button onClick={handleClick}>Click Me</Button>
      <View className='divider'></View>
      {formData?.name && (
        <View className='form-data'> Name: {formData.name} </View>
      )}
      {formData?.email && (
        <View className='form-data'> Email: {formData.email} </View>
      )}
    </View>
  );
}
