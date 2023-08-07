import { useGetCategorysQuery } from "@/Api/categoryApi";
import { Category } from "@/interface/categorys";
import { useAddProductMutation } from "@/Api/productApi";
import { IProduct } from "@/interface/products";
import { Form, Button, Input,Select } from "antd";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
type FieldType = {
    name: string;
    price: number;
    img: string;
    description:string;
    categoryId: string;

};
const Addproduct = () => {
    const [addProduct, { isLoading }] = useAddProductMutation();
    const navigate = useNavigate();
    const onFinish = (values: IProduct) => {
        addProduct(values)
            .unwrap()
            .then(() => navigate("/admin/products"));
    };

    const { data:  categoryData } = useGetCategorysQuery();
    console.log(categoryData?.data);
     const dataSource = categoryData?.data.map(({ _id, name }: Category) => ({
            key: _id,
            _id,
            name,
        }))

    return (
        <div>
            <header className="mb-4">
                <h2 className="font-bold text-2xl">Thêm sản phẩm</h2>
            </header>
            <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                onFinish={onFinish}
                autoComplete="off"
            >
                    <Form.Item<FieldType>
                    label="Tên sản phẩm"
                    name="name"
                    rules={[
                        { required: true, message: "Vui lòng nhập tên sản phẩm!" },
                        { min: 3, message: "Sản phẩm ít nhất 3 ký tự" },
                    ]}
                >
                    <Input />
                </Form.Item>
            
                <Form.Item<FieldType> label="ảnh"  name="img">
                    <Input />
                </Form.Item>

                <Form.Item<FieldType> label="Giá sản phẩm" name="price">
                    <Input />
                </Form.Item>
                <Form.Item<FieldType>
                    label="mô tả"
                    name="description"
                    rules={[
                        { required: true, message: "Vui lòng nhập tên sản phẩm!" },
                        { min: 3, message: "Sản phẩm ít nhất 3 ký tự" },
                    ]}
                >
                    <Input />
                </Form.Item>
                
                <Form.Item label="category" name="categoryId">     
                <Select>
                   {categoryData?.data.map(({ _id, name }: Category) => (
                      <Select.Option key={_id} value={_id}>                 
                          {name}
                       </Select.Option>
                      ))}
                  </Select>
                </Form.Item>
            
                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" danger htmlType="submit">
                        {isLoading ? (
                            <AiOutlineLoading3Quarters className="animate-spin" />
                        ) : (
                            "Thêm"
                        )}
                    </Button>
                    <Button
                        type="primary"
                        danger
                        className="ml-2"
                        onClick={() => navigate("/admin/products")}
                    >
                        Quay lại
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default Addproduct;