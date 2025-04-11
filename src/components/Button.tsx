import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View, ActivityIndicator, ViewStyle, TextStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../utils/theme';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'text';
  size?: 'small' | 'medium' | 'large';
  icon?: string;
  iconPosition?: 'left' | 'right';
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  icon,
  iconPosition = 'left',
  disabled = false,
  loading = false,
  fullWidth = false,
}) => {
  const getButtonStyle = (): ViewStyle[] => {
    const baseStyle: ViewStyle[] = [styles.button];
    
    // Add variant styles
    if (variant === 'primary') {
      baseStyle.push(styles.primaryButton);
    } else if (variant === 'secondary') {
      baseStyle.push(styles.secondaryButton);
    } else if (variant === 'outline') {
      baseStyle.push(styles.outlineButton);
    } else if (variant === 'text') {
      baseStyle.push(styles.textButton);
    }
    
    // Add size styles
    if (size === 'small') {
      baseStyle.push(styles.smallButton);
    } else if (size === 'large') {
      baseStyle.push(styles.largeButton);
    }
    
    // Add full width style
    if (fullWidth) {
      baseStyle.push(styles.fullWidth);
    }
    
    // Add disabled style
    if (disabled) {
      baseStyle.push(styles.disabledButton);
    }
    
    return baseStyle;
  };
  
  const getTextStyle = (): TextStyle[] => {
    const baseStyle: TextStyle[] = [styles.text];
    
    // Add variant text styles
    if (variant === 'outline' || variant === 'text') {
      baseStyle.push(styles.outlineText);
    }
    
    // Add size text styles
    if (size === 'small') {
      baseStyle.push(styles.smallText);
    } else if (size === 'large') {
      baseStyle.push(styles.largeText);
    }
    
    // Add disabled text style
    if (disabled) {
      baseStyle.push(styles.disabledText);
    }
    
    return baseStyle;
  };
  
  return (
    <TouchableOpacity
      style={getButtonStyle()}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator 
          size="small" 
          color={variant === 'outline' || variant === 'text' ? theme.colors.primary : '#FFFFFF'} 
        />
      ) : (
        <View style={styles.contentContainer}>
          {icon && iconPosition === 'left' && (
            <Ionicons 
              name={icon as any} 
              size={size === 'small' ? 16 : size === 'large' ? 24 : 20} 
              color={variant === 'outline' || variant === 'text' ? theme.colors.primary : '#FFFFFF'} 
              style={styles.leftIcon} 
            />
          )}
          <Text style={getTextStyle()}>{title}</Text>
          {icon && iconPosition === 'right' && (
            <Ionicons 
              name={icon as any} 
              size={size === 'small' ? 16 : size === 'large' ? 24 : 20} 
              color={variant === 'outline' || variant === 'text' ? theme.colors.primary : '#FFFFFF'} 
              style={styles.rightIcon} 
            />
          )}
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 12,
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: theme.colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  primaryButton: {
    backgroundColor: theme.colors.primary,
  },
  secondaryButton: {
    backgroundColor: theme.colors.secondary,
  },
  outlineButton: {
    backgroundColor: 'white',
    borderWidth: 1.5,
    borderColor: theme.colors.primary,
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 1,
  },
  textButton: {
    backgroundColor: 'transparent',
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  smallButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  largeButton: {
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
    borderRadius: 16,
  },
  fullWidth: {
    width: '100%',
  },
  disabledButton: {
    backgroundColor: theme.colors.border,
    borderColor: 'transparent',
    opacity: 0.6,
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 16,
    letterSpacing: 0.5,
  },
  outlineText: {
    color: theme.colors.primary,
  },
  smallText: {
    fontSize: 14,
    color: theme.colors.primary,
    fontWeight: '600',
    letterSpacing: 0.25,
  },
  largeText: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: '600',
    letterSpacing: 0.75,
  },
  disabledText: {
    color: 'rgba(0, 0, 0, 0.38)',
  },
  leftIcon: {
    marginRight: theme.spacing.xs,
  },
  rightIcon: {
    marginLeft: theme.spacing.xs,
  },
}); 