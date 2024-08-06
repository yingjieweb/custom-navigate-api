import { useState, useEffect } from "react";
import Taro, { eventCenter, useRouter } from "@tarojs/taro";
import { View, Button, Form, Input } from "@tarojs/components";
import "./index.css";

export default function PageB() {
  const { name, email } = useRouter().params;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  useEffect(() => {
    setFormData({ name, email });
  }, [name, email]);

  const handleInputChange = (key, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };
  const handleSubmit = (event) => {
    const newFormData = event.detail.value;
    eventCenter.trigger("formDataChange", newFormData);
    Taro.navigateBack();
  };

  return (
    <View className='page-b'>
      <Form onSubmit={handleSubmit}>
        <View className='form-item'>
          <Input
            name='name'
            placeholder='Name'
            value={formData.name}
            onInput={(e) => handleInputChange('name', e.detail.value)}
          />
        </View>
        <View className='form-item'>
          <Input
            name='email'
            placeholder='Email'
            value={formData.email}
            onInput={(e) => handleInputChange('email', e.detail.value)}
          />
        </View>
        <Button formType='submit'>Submit</Button>
      </Form>
    </View>
  );
}
