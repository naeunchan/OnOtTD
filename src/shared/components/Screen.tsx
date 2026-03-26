import { PropsWithChildren, ReactNode } from 'react';
import { SafeAreaView, ScrollView, StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';
import { appColors } from '../../app/theme/colors';
import { spacing } from '../../app/theme/spacing';

interface ScreenProps extends PropsWithChildren {
  scrollable?: boolean;
  contentStyle?: StyleProp<ViewStyle>;
  title?: string;
  subtitle?: string;
}

export function Screen({
  children,
  scrollable = true,
  contentStyle,
  title,
  subtitle,
}: ScreenProps) {
  const header: ReactNode =
    title == null ? null : (
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        {subtitle == null ? null : <Text style={styles.subtitle}>{subtitle}</Text>}
      </View>
    );

  return (
    <SafeAreaView style={styles.safeArea}>
      {scrollable ? (
        <ScrollView contentContainerStyle={[styles.content, contentStyle]} style={styles.scrollView}>
          {header}
          {children}
        </ScrollView>
      ) : (
        <View style={[styles.content, styles.fill, contentStyle]}>
          {header}
          {typeof children === 'string' ? <Text style={styles.loadingText}>{children}</Text> : children}
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: appColors.background,
  },
  scrollView: {
    flex: 1,
  },
  fill: {
    flex: 1,
    justifyContent: 'center',
  },
  content: {
    padding: spacing.s20,
    gap: spacing.s16,
  },
  header: {
    gap: spacing.s8,
    marginBottom: spacing.s8,
  },
  title: {
    color: appColors.textPrimary,
    fontSize: 28,
    fontWeight: '700',
  },
  subtitle: {
    color: appColors.textSecondary,
    fontSize: 15,
    lineHeight: 22,
  },
  loadingText: {
    color: appColors.textSecondary,
    textAlign: 'center',
    fontSize: 15,
  },
});

