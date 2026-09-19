import { Size } from '@/core/products/interfaces/product.interface'
import ProductImages from '@/presentation/products/components/ProductImages'
import { useProduct } from '@/presentation/products/hooks/useProduct'
import { useCameraStore } from '@/presentation/store/useCameraStore'
import MenuIconButton from '@/presentation/theme/components/MenuIconButton'
import { ThemedView } from '@/presentation/theme/components/themed-view'
import ThemeButton from '@/presentation/theme/components/ThemedButton'
import ThemedButtonGroup from '@/presentation/theme/components/ThemedButtonGroup'
import ThemedTextInput from '@/presentation/theme/components/ThemedTextInput'
import { Redirect, router, useLocalSearchParams, useNavigation } from 'expo-router'
import { Formik } from 'formik'
import { useEffect } from 'react'
import { ActivityIndicator, KeyboardAvoidingView, Platform, RefreshControl, ScrollView, View } from 'react-native'

const ProductScreen = () => {

    const { selectedImagens, clearImages } = useCameraStore();

    const { id } = useLocalSearchParams()
    const navigation = useNavigation()

    const { productQuery, productMutation } = useProduct(`${id}`)

    useEffect(() => {
        return () => {
            clearImages();
        }
    }, [])

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => <MenuIconButton onPress={() => router.push('/camera')} icon='camera-outline' />
        })
    }, [])

    useEffect(() => {
        if (productQuery.data) {
            navigation.setOptions({
                title: productQuery.data.title
            })
        }

    }, [productQuery.data])


    if (productQuery.isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size={30} />
            </View>
        )
    }

    if (!productQuery.data) {
        return <Redirect href="/(products-app)/(home)" />
    }

    const product = productQuery.data!;


    return (
        <Formik
            initialValues={product}
            onSubmit={(productLike) =>
                productMutation.mutate({
                    ...productLike,
                    images: [...productLike.images, ...selectedImagens]
                })}
        >
            {

                ({ values, handleSubmit, handleChange, setFieldValue }) => (
                    <KeyboardAvoidingView
                        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                        style={{ flex: 1 }}
                    >
                        <ScrollView
                            refreshControl={
                                <RefreshControl
                                    refreshing={productQuery.isFetching}
                                    onRefresh={async () => await productQuery.refetch()}
                                />
                            }
                            style={{ flex: 1 }}>
                            {/* Products Images - se agregan las imagenes del store a las del producto */}
                            <ProductImages images={[...(product.images ?? []), ...(selectedImagens ?? [])]} />

                            <ThemedView style={{ marginHorizontal: 10, marginTop: 20 }}>
                                <ThemedTextInput
                                    placeholder='Titulo'
                                    style={{ marginVertical: 5 }}
                                    value={values.title}
                                    onChangeText={handleChange('title')}
                                />

                                <ThemedTextInput
                                    placeholder='Slug'
                                    style={{ marginVertical: 5 }}
                                    value={values.slug}
                                    onChangeText={handleChange('slug')}
                                />
                                <ThemedTextInput
                                    placeholder='Descripcion'
                                    multiline
                                    numberOfLines={5}
                                    style={{ marginVertical: 5 }}
                                    value={values.description}
                                    onChangeText={handleChange('description')}
                                />
                            </ThemedView>

                            <ThemedView style={{ marginHorizontal: 10, marginVertical: 5, flexDirection: 'row', gap: 10 }}>
                                <ThemedTextInput
                                    placeholder='Precio'
                                    style={{ flex: 1 }}
                                    value={(values.price ?? 0).toString()}
                                    onChangeText={handleChange('price')}
                                />
                                <ThemedTextInput
                                    placeholder='Inventario'
                                    style={{ flex: 1 }}
                                    value={(values.stock ?? 0).toString()}
                                    onChangeText={handleChange('stock')}
                                />

                            </ThemedView>

                            <ThemedView
                                style={{ marginHorizontal: 10 }}
                            >
                                <ThemedButtonGroup
                                    options={['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL']}
                                    selectedOption={values.sizes ?? []}
                                    onSelec={(selectedSizes) => {

                                        const newSizeValue = (values.sizes ?? []).includes(selectedSizes as Size)
                                            ? values.sizes.filter(s => s !== selectedSizes)
                                            : [...(values.sizes ?? []), selectedSizes]
                                        setFieldValue('sizes', newSizeValue)
                                    }}
                                />
                                <ThemedButtonGroup
                                    options={['kid', 'men', 'women', 'unisex']}
                                    selectedOption={[values.gender]}
                                    onSelec={(selectedOption) => setFieldValue('gender', selectedOption)}
                                />
                            </ThemedView>

                            {/* Boton para guardar */}
                            <View style={{
                                marginHorizontal: 10, marginBottom: 50, marginTop: 20
                            }}>
                                <ThemeButton
                                    icon='save-outline'
                                    onPress={() => handleSubmit()}
                                >
                                    Guardar
                                </ThemeButton>
                            </View>

                        </ScrollView>
                    </KeyboardAvoidingView>
                )
            }

        </Formik>

    )
}

export default ProductScreen
