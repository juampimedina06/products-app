import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../hooks/use-theme';
import { ThemedText } from './themed-text';

interface Props {
    options: string[];
    selectedOption: string[];

    onSelec: (option: string) => void;
}

const ThemedButtonGroup = ({ options, selectedOption, onSelec }: Props) => {

    const theme = useTheme();

    return (
        <View style={styles.container}>
            {
                options.map(option => {
                    const isSelected = selectedOption.includes(option);

                    return (
                        <TouchableOpacity
                            key={option}
                            onPress={() => onSelec(option)}
                            style={[
                                styles.button,
                                {
                                    backgroundColor: isSelected ? theme.primary : theme.backgroundElement,
                                }
                            ]}
                        >
                            <ThemedText
                                adjustsFontSizeToFit
                                numberOfLines={1}
                                style={[
                                    styles.buttonText,
                                    isSelected && styles.selectedButtonText
                                ]}
                            >
                                {option[0].toUpperCase() + option.slice(1)}
                            </ThemedText>
                        </TouchableOpacity>
                    );
                })
            }
        </View>
    );
};

export default ThemedButtonGroup;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },
    button: {
        padding: 10,
        margin: 5,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    },
    buttonText: {
        fontSize: 16
    },
    selectedButtonText: {
        color: '#fff',
    }
});