import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Animated,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
  Vibration,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';

const { width, height } = Dimensions.get('window');

const DimaLa3bAuth = () => {
  const [currentScreen, setCurrentScreen] = useState('login');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    resetCode: '',
    newPassword: ''
  });

  // Animation references
  const slideAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const footballRotation = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  // Football animation
  useEffect(() => {
    const rotateFootball = Animated.loop(
      Animated.timing(footballRotation, {
        toValue: 1,
        duration: 3000,
        useNativeDriver: true,
      })
    );

    const pulseAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    );

    rotateFootball.start();
    pulseAnimation.start();

    return () => {
      rotateFootball.stop();
      pulseAnimation.stop();
    };
  }, []);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const switchScreen = (screen, direction = 'left') => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

    const slideValue = direction === 'right' ? width : -width;

    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: slideValue,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setCurrentScreen(screen);
      slideAnim.setValue(-slideValue);

      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    });
  };

  const handleSubmit = async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setIsLoading(true);

    // Button press animation
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      if (currentScreen === 'resetPassword') {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        setCurrentScreen('success');
      } else if (currentScreen === 'login') {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        Alert.alert('Success', 'Login successful! Welcome to Dima La3b!');
      } else if (currentScreen === 'signup') {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        Alert.alert('Success', 'Account created successfully!');
      }
    }, 2000);
  };

  const FootballSpinner = () => {
    const spinValue = footballRotation.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg'],
    });

    return (
      <View style={styles.spinnerContainer}>
        <Animated.View
          style={[
            styles.footballSpinner,
            { transform: [{ rotate: spinValue }] }
          ]}
        >
          <Text style={styles.footballEmoji}>⚽</Text>
        </Animated.View>
      </View>
    );
  };

  const InputField = ({ 
    icon, 
    placeholder, 
    value, 
    onChange, 
    secureTextEntry = false,
    showToggle = false,
    keyboardType = 'default'
  }) => (
    <View style={styles.inputContainer}>
      <View style={styles.inputWrapper}>
        <Ionicons name={icon} size={20} color="#9CA3AF" style={styles.inputIcon} />
        <TextInput
          style={styles.textInput}
          placeholder={placeholder}
          placeholderTextColor="#9CA3AF"
          value={value}
          onChangeText={onChange}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          autoCapitalize="none"
        />
        {showToggle && (
          <TouchableOpacity
            onPress={() => {
              if (placeholder.includes('Confirm')) {
                setShowConfirmPassword(!showConfirmPassword);
              } else {
                setShowPassword(!showPassword);
              }
            }}
            style={styles.eyeButton}
          >
            <Ionicons
              name={secureTextEntry ? 'eye-off' : 'eye'}
              size={20}
              color="#9CA3AF"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  const ActionButton = ({ title, onPress, variant = 'primary', disabled = false }) => (
    <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
      <TouchableOpacity
        onPress={onPress}
        disabled={disabled || isLoading}
        style={[
          styles.actionButton,
          variant === 'primary' ? styles.primaryButton : styles.secondaryButton,
          (disabled || isLoading) && styles.disabledButton
        ]}
        activeOpacity={0.8}
      >
        <LinearGradient
          colors={variant === 'primary' ? ['#10B981', '#059669'] : ['#374151', '#4B5563']}
          style={styles.buttonGradient}
        >
          {isLoading ? (
            <View style={styles.loadingContainer}>
              <FootballSpinner />
              <Text style={styles.buttonText}>Loading...</Text>
            </View>
          ) : (
            <Text style={[styles.buttonText, variant !== 'primary' && styles.secondaryButtonText]}>
              {title}
            </Text>
          )}
        </LinearGradient>
      </TouchableOpacity>
    </Animated.View>
  );

  const ScreenContainer = ({ children, title, subtitle }) => (
    <Animated.View
      style={[
        styles.screenContainer,
        {
          transform: [{ translateX: slideAnim }],
          opacity: fadeAnim,
        },
      ]}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={styles.header}>
            <Animated.View
              style={[
                styles.logoContainer,
                { transform: [{ scale: pulseAnim }] }
              ]}
            >
              <LinearGradient
                colors={['#10B981', '#059669']}
                style={styles.logoGradient}
              >
                <Text style={styles.logoEmoji}>⚽</Text>
              </LinearGradient>
            </Animated.View>

            <Text style={styles.appTitle}>Dima La3b</Text>
            <Text style={styles.screenTitle}>{title}</Text>
            {subtitle && <Text style={styles.screenSubtitle}>{subtitle}</Text>}
          </View>

          {children}
        </ScrollView>
      </KeyboardAvoidingView>
    </Animated.View>
  );

  const LoginScreen = () => (
    <ScreenContainer title="أهلاً بعودتك" subtitle="سجل دخولك لتكمل رحلتك في كرة القدم">
      <View style={styles.formContainer}>
        <InputField
          icon="mail"
          placeholder="البريد الإلكتروني أو اسم المستخدم"
          value={formData.email}
          onChange={(value) => handleInputChange('email', value)}
          keyboardType="email-address"
        />

        <InputField
          icon="lock-closed"
          placeholder="كلمة المرور"
          value={formData.password}
          onChange={(value) => handleInputChange('password', value)}
          secureTextEntry={!showPassword}
          showToggle={true}
        />

        <View style={styles.optionsContainer}>
          <TouchableOpacity
            style={styles.rememberContainer}
            onPress={() => setRememberMe(!rememberMe)}
          >
            <Ionicons
              name={rememberMe ? 'checkbox' : 'square-outline'}
              size={20}
              color="#10B981"
            />
            <Text style={styles.rememberText}>تذكرني</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => switchScreen('forgotPassword')}>
            <Text style={styles.linkText}>نسيت كلمة المرور؟</Text>
          </TouchableOpacity>
        </View>

        <ActionButton title="دخول" onPress={handleSubmit} />

        <View style={styles.switchContainer}>
          <Text style={styles.switchText}>ليس لديك حساب؟ </Text>
          <TouchableOpacity onPress={() => switchScreen('signup')}>
            <Text style={styles.linkText}>أنشئ حساباً</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScreenContainer>
  );

  const SignupScreen = () => (
    <ScreenContainer title="انضم للفريق" subtitle="أنشئ حسابك وابدأ اللعب">
      <View style={styles.formContainer}>
        <InputField
          icon="person"
          placeholder="الاسم الكامل"
          value={formData.fullName}
          onChange={(value) => handleInputChange('fullName', value)}
        />

        <InputField
          icon="mail"
          placeholder="البريد الإلكتروني"
          value={formData.email}
          onChange={(value) => handleInputChange('email', value)}
          keyboardType="email-address"
        />

        <InputField
          icon="person-circle"
          placeholder="اسم المستخدم"
          value={formData.username}
          onChange={(value) => handleInputChange('username', value)}
        />

        <InputField
          icon="lock-closed"
          placeholder="كلمة المرور"
          value={formData.password}
          onChange={(value) => handleInputChange('password', value)}
          secureTextEntry={!showPassword}
          showToggle={true}
        />

        <InputField
          icon="lock-closed"
          placeholder="تأكيد كلمة المرور"
          value={formData.confirmPassword}
          onChange={(value) => handleInputChange('confirmPassword', value)}
          secureTextEntry={!showConfirmPassword}
          showToggle={true}
        />

        <ActionButton title="إنشاء حساب" onPress={handleSubmit} />

        <View style={styles.switchContainer}>
          <Text style={styles.switchText}>لديك حساب بالفعل؟ </Text>
          <TouchableOpacity onPress={() => switchScreen('login', 'right')}>
            <Text style={styles.linkText}>سجل دخولك</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScreenContainer>
  );

  const ForgotPasswordScreen = () => (
    <ScreenContainer title="استعادة كلمة المرور" subtitle="أدخل بريدك الإلكتروني لتلقي رمز الاستعادة">
      <View style={styles.formContainer}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => switchScreen('login', 'right')}
        >
          <Ionicons name="arrow-back" size={20} color="#10B981" />
          <Text style={styles.backText}>العودة لتسجيل الدخول</Text>
        </TouchableOpacity>

        <InputField
          icon="mail"
          placeholder="البريد الإلكتروني أو اسم المستخدم"
          value={formData.email}
          onChange={(value) => handleInputChange('email', value)}
          keyboardType="email-address"
        />

        <ActionButton title="إرسال رمز الاستعادة" onPress={() => switchScreen('resetCode')} />
      </View>
    </ScreenContainer>
  );

  const ResetCodeScreen = () => (
    <ScreenContainer title="أدخل رمز الاستعادة" subtitle="تحقق من بريدك الإلكتروني للحصول على رمز التحقق">
      <View style={styles.formContainer}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => switchScreen('forgotPassword', 'right')}
        >
          <Ionicons name="arrow-back" size={20} color="#10B981" />
          <Text style={styles.backText}>رجوع</Text>
        </TouchableOpacity>

        <View style={styles.emailInfo}>
          <Text style={styles.emailInfoText}>أرسلنا رمزاً إلى</Text>
          <Text style={styles.emailAddress}>{formData.email || 'بريدك الإلكتروني'}</Text>
        </View>

        <InputField
          icon="lock-closed"
          placeholder="أدخل الرمز المكون من 6 أرقام"
          value={formData.resetCode}
          onChange={(value) => handleInputChange('resetCode', value)}
          keyboardType="numeric"
        />

        <InputField
          icon="lock-closed"
          placeholder="كلمة المرور الجديدة"
          value={formData.newPassword}
          onChange={(value) => handleInputChange('newPassword', value)}
          secureTextEntry={!showPassword}
          showToggle={true}
        />

        <ActionButton title="إعادة تعيين كلمة المرور" onPress={handleSubmit} />

        <TouchableOpacity style={styles.resendContainer}>
          <Text style={styles.linkText}>لم تتلق الرمز؟ إعادة الإرسال</Text>
        </TouchableOpacity>
      </View>
    </ScreenContainer>
  );

  const SuccessScreen = () => (
    <ScreenContainer title="تم إعادة تعيين كلمة المرور!" subtitle="تم تحديث كلمة المرور بنجاح">
      <View style={styles.successContainer}>
        <View style={styles.successIcon}>
          <Ionicons name="checkmark" size={40} color="white" />
        </View>

        <Text style={styles.successMessage}>
          يمكنك الآن تسجيل الدخول بكلمة المرور الجديدة
        </Text>

        <ActionButton title="متابعة إلى تسجيل الدخول" onPress={() => switchScreen('login')} />
      </View>
    </ScreenContainer>
  );

  const screens = {
    login: <LoginScreen />,
    signup: <SignupScreen />,
    forgotPassword: <ForgotPasswordScreen />,
    resetCode: <ResetCodeScreen />,
    resetPassword: <ResetCodeScreen />, // Assuming resetPassword should also render ResetCodeScreen initially
    success: <SuccessScreen />
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />
      <LinearGradient
        colors={['#000000', '#1F2937', '#000000']}
        style={styles.backgroundGradient}
      >
        {screens[currentScreen]}

        {/* Navigation dots */}
        {['login', 'signup'].includes(currentScreen) && (
          <View style={styles.navigationDots}>
            {['login', 'signup'].map((screen) => (
              <TouchableOpacity
                key={screen}
                onPress={() => switchScreen(screen)}
                style={[
                  styles.dot,
                  currentScreen === screen && styles.activeDot
                ]}
              />
            ))}
          </View>
        )}
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  backgroundGradient: {
    flex: 1,
  },
  screenContainer: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 100,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logoContainer: {
    marginBottom: 16,
  },
  logoGradient: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#10B981',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  logoEmoji: {
    fontSize: 32,
  },
  appTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#10B981',
    marginBottom: 8,
    textAlign: 'center',
  },
  screenTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: 'white',
    marginBottom: 8,
    textAlign: 'center',
  },
  screenSubtitle: {
    fontSize: 16,
    color: '#9CA3AF',
    textAlign: 'center',
    lineHeight: 24,
  },
  formContainer: {
    flex: 1,
  },
  inputContainer: {
    marginBottom: 16,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1F2937',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#374151',
    paddingHorizontal: 16,
    height: 56,
  },
  inputIcon: {
    marginRight: 12,
  },
  textInput: {
    flex: 1,
    color: 'white',
    fontSize: 16,
    textAlign: 'right',
  },
  eyeButton: {
    padding: 4,
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  rememberContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rememberText: {
    color: '#D1D5DB',
    marginLeft: 8,
    fontSize: 14,
  },
  linkText: {
    color: '#10B981',
    fontSize: 14,
    fontWeight: '500',
  },
  actionButton: {
    marginBottom: 20,
  },
  buttonGradient: {
    height: 56,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButton: {
    shadowColor: '#10B981',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  secondaryButton: {
    borderWidth: 1,
    borderColor: '#374151',
  },
  disabledButton: {
    opacity: 0.5,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  secondaryButtonText: {
    color: '#D1D5DB',
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  spinnerContainer: {
    marginRight: 12,
  },
  footballSpinner: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footballEmoji: {
    fontSize: 20,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  switchText: {
    color: '#9CA3AF',
    fontSize: 14,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  backText: {
    color: '#10B981',
    marginLeft: 8,
    fontSize: 16,
    fontWeight: '500',
  },
  emailInfo: {
    alignItems: 'center',
    marginBottom: 24,
  },
  emailInfoText: {
    color: '#9CA3AF',
    fontSize: 14,
  },
  emailAddress: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
    marginTop: 4,
  },
  resendContainer: {
    alignItems: 'center',
    marginTop: 16,
  },
  successContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  successIcon: {
    width: 80,
    height: 80,
    backgroundColor: '#10B981',
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32,
  },
  successMessage: {
    color: '#D1D5DB',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 24,
  },
  navigationDots: {
    position: 'absolute',
    bottom: 40,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#374151',
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#10B981',
    width: 24,
  },
});

export default DimaLa3bAuth;
