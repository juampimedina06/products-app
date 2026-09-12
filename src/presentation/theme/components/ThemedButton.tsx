import { Ionicons } from '@expo/vector-icons'
import { Pressable, PressableProps, StyleSheet, Text } from 'react-native'
import { useTheme } from '../hooks/use-theme'

interface Props extends PressableProps {
    children: string
    icon?: keyof typeof Ionicons.glyphMap

}

const ThemeButton = ({ children, icon, ...rest }: Props) => {

    const PrimaryColor = useTheme().primary

    return (
        <Pressable
            style={({ pressed }) => [
                {
                    backgroundColor: pressed ? PrimaryColor + '90' : PrimaryColor
                },
                styles.button
            ]}
            {...rest}
        >
            <Text style={{ color: 'white' }}>
                {children}
            </Text>

            {
                icon && (
                    <Ionicons
                        name={icon}
                        size={24}
                        color='white'
                        style={{ marginHorizontal: 5 }}
                    />
                )
            }

        </Pressable>
    )
}

export default ThemeButton

const styles = StyleSheet.create({
    button: {
        paddingHorizontal: 10,
        paddingVertical: 15,
        borderRadius: 5,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center'
    }
})