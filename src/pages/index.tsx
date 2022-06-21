import { useReducer } from 'react';
import {
  Form,
  Row,
  Col,
  Input,
  Select,
  Card,
  Cascader,
  Button,
  Space,
} from 'antd';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import options from '@/assets/json/pca-code.json';

import styles from './index.less';

enum ActionType {
  PRODUCT_NAME = 'productName',
  PRODUCT_TYPE = 'productType',
  FACTORY_LIST = 'factoryList',
}

interface Address {
  province: string;
  city: string;
  county: string;
}

interface Factory {
  factoryName: string;
  factoryOwner: string;
  factoryLocation: Address;
}

interface IProduct {
  productName: string;
  productType: string;
  factoryList: Factory[];
}

const initState: IProduct = {
  productName: '',
  productType: '',
  factoryList: [
    {
      factoryName: '',
      factoryOwner: '',
      factoryLocation: {
        province: '',
        city: '',
        county: '',
      },
    },
  ],
};

function reducer(state, action) {
  switch (action.type) {
    case ActionType.PRODUCT_NAME:
      return {
        ...state,
        productName: action.payload,
      };
    case ActionType.PRODUCT_TYPE:
      return {
        ...state,
        productType: action.payload,
      };
    case ActionType.FACTORY_LIST:
      return {
        ...state,
        factoryList: action.payload,
      };
    default:
      return state;
  }
}

export default function App() {
  const [{ productName, productType, factoryList }, dispatch] = useReducer(
    reducer,
    initState,
  );
  return (
    <div className={styles.container}>
      <Form>
        <Row gutter={20}>
          <Col span={12}>
            <Form.Item label="商品名称">
              <Input
                value={productName}
                onChange={(evt) => {
                  dispatch({
                    type: ActionType.PRODUCT_NAME,
                    payload: evt.target.value,
                  });
                }}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="商品种类">
              <Select
                value={productType}
                onChange={(value) => {
                  dispatch({ type: ActionType.PRODUCT_TYPE, payload: value });
                }}
              >
                <Select.Option key={1}>西瓜</Select.Option>
                <Select.Option key={2}>南瓜</Select.Option>
                <Select.Option key={3}>冬瓜</Select.Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        {factoryList.map((factory: Factory, index: number) => {
          const i = index;
          return (
            <Card
              key={i}
              title={
                <Space style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <Button
                    onClick={() => {
                      factoryList.push({
                        factoryName: '',
                        factoryOwner: '',
                        factoryLocation: {
                          province: '',
                          city: '',
                          county: '',
                        },
                      });
                      dispatch({
                        type: ActionType.FACTORY_LIST,
                        payload: factoryList,
                      });
                    }}
                    icon={<PlusOutlined size={32} />}
                  >
                    新增厂商
                  </Button>
                  <Button
                    onClick={() => {
                      factoryList.splice(i, 1);
                      dispatch({
                        type: ActionType.FACTORY_LIST,
                        payload: factoryList,
                      });
                    }}
                    icon={<MinusOutlined size={32} />}
                  >
                    删除厂商
                  </Button>
                </Space>
              }
            >
              <Row gutter={20}>
                <Col span={12}>
                  <Form.Item label="厂商名称">
                    <Input
                      value={factory.factoryName}
                      onChange={(evt) => {
                        factoryList[index].factoryName = evt.target.value;
                        dispatch({
                          type: ActionType.FACTORY_LIST,
                          payload: factoryList,
                        });
                      }}
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="厂商法人">
                    <Select
                      value={factory.factoryOwner}
                      onChange={(value) => {
                        factoryList[index].factoryOwner = value;
                        dispatch({
                          type: ActionType.FACTORY_LIST,
                          payload: factoryList,
                        });
                      }}
                    >
                      <Select.Option key={1}>张三</Select.Option>
                      <Select.Option key={2}>李四</Select.Option>
                      <Select.Option key={3}>王五</Select.Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item label="生产地址">
                    <Cascader
                      fieldNames={{
                        label: 'name',
                        value: 'code',
                        children: 'children',
                      }}
                      options={options}
                      onChange={(list: any) => {
                        if (list && list.length === 3) {
                          factoryList[index].factoryLocation.province = list[0];
                          factoryList[index].factoryLocation.city = list[1];
                          factoryList[index].factoryLocation.county = list[2];
                          dispatch({
                            type: ActionType.FACTORY_LIST,
                            payload: factoryList,
                          });
                        }
                      }}
                    />
                  </Form.Item>
                </Col>
              </Row>
            </Card>
          );
        })}
      </Form>
    </div>
  );
}
