import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from './System-StatusScreen.styles';

interface StatusCardProps {
  icon: keyof typeof Ionicons.glyphMap;
  count: number;
  label: string;
  color: string;
  bgColor: string;
  percentage?: number;
  trend?: 'up' | 'down' | 'neutral';
  onPress?: () => void;
}

const StatusCard: React.FC<StatusCardProps> = ({ 
  icon, 
  count, 
  label, 
  color, 
  bgColor, 
  percentage = 0,
  trend = 'neutral',
  onPress 
}) => {
  const scaleAnim = React.useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.96,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  const getTrendColor = () => {
    switch (trend) {
      case 'up':
        return '#10B981';
      case 'down':
        return '#EF4444';
      default:
        return '#64748B';
    }
  };

  const getTrendIcon = () => {
    switch (trend) {
      case 'up':
        return 'trending-up';
      case 'down':
        return 'trending-down';
      default:
        return 'remove';
    }
  };

  return (
    <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
      <TouchableOpacity
        style={styles.card}
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={1}
      >
        <View style={styles.cardHeader}>
          <View style={[styles.iconContainer, { backgroundColor: bgColor }]}>
            <Ionicons name={icon} size={22} color={color} />
          </View>
          <View style={[styles.trendBadge, { backgroundColor: `${getTrendColor()}15` }]}>
            <Ionicons name={getTrendIcon() as any} size={12} color={getTrendColor()} />
          </View>
        </View>
        <View style={styles.cardContent}>
          <Text style={styles.count}>{count.toLocaleString()}</Text>
          <Text style={styles.label} numberOfLines={2}>{label}</Text>
          <View style={styles.progressBar}>
            <View 
              style={[
                styles.progressFill, 
                { width: `${percentage}%`, backgroundColor: color }
              ]} 
            />
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

interface SystemStatusScreenProps {
  navigation: any;
}

const SystemStatusScreen: React.FC<SystemStatusScreenProps> = ({ navigation }) => {
  const statusData = [
    { 
      icon: 'checkmark-circle' as const, 
      count: 1202, 
      label: 'Operating Normal', 
      color: '#3B82F6', 
      bgColor: '#EFF6FF',
      percentage: 65,
      trend: 'up' as const
    },
    { 
      icon: 'stop-circle' as const, 
      count: 6601, 
      label: 'Full Stop', 
      color: '#EF4444', 
      bgColor: '#FEF2F2',
      percentage: 85,
      trend: 'down' as const
    },
    { 
      icon: 'alert-circle' as const, 
      count: 1202, 
      label: 'Alarm Stop', 
      color: '#F59E0B', 
      bgColor: '#FFFBEB',
      percentage: 45,
      trend: 'up' as const
    },
    { 
      icon: 'call-outline' as const, 
      count: 6601, 
      label: 'Stopped Calling', 
      color: '#8B5CF6', 
      bgColor: '#F5F3FF',
      percentage: 72,
      trend: 'neutral' as const
    },
    { 
      icon: 'pause-circle' as const, 
      count: 1202, 
      label: 'Standby Mode', 
      color: '#EC4899', 
      bgColor: '#FDF2F8',
      percentage: 38,
      trend: 'down' as const
    },
    { 
      icon: 'flask' as const, 
      count: 6601, 
      label: 'Test System', 
      color: '#14B8A6', 
      bgColor: '#F0FDFA',
      percentage: 90,
      trend: 'up' as const
    },
    { 
      icon: 'construct' as const, 
      count: 1202, 
      label: 'Under Installation', 
      color: '#06B6D4', 
      bgColor: '#ECFEFF',
      percentage: 55,
      trend: 'neutral' as const
    },
    { 
      icon: 'time' as const, 
      count: 6601, 
      label: 'Waiting Position', 
      color: '#6366F1', 
      bgColor: '#EEF2FF',
      percentage: 68,
      trend: 'up' as const
    },
  ];

  const totalUnits = statusData.reduce((sum, item) => sum + item.count, 0);

  const handleBackButton = () => {
    navigation.goBack();
  };

  // Calculate percentages for the stats bar
  const getStatsBarData = () => {
    return statusData.map(item => ({
      color: item.color,
      percentage: (item.count / totalUnits) * 100,
    }));
  };

  // Split data into rows of 2 cards each
  const getCardRows = () => {
    const rows = [];
    for (let i = 0; i < statusData.length; i += 2) {
      rows.push(statusData.slice(i, i + 2));
    }
    return rows;
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBackButton}>
          <Ionicons name="arrow-back" size={22} color="#0F172A" />
        </TouchableOpacity>
        {/* <Text style={styles.headerTitle}>System Monitor</Text> */}
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero Section */}
        <View style={styles.heroSection}>
          <Text style={styles.heroTitle}>System Status</Text>
          <Text style={styles.heroSubtitle}>
            Monitor all system units in real-time with detailed analytics
          </Text>
        </View>

        {/* Statistics Card */}
        <View style={styles.statsCard}>
          <View style={styles.statsHeader}>
            <Text style={styles.statsTitle}>TOTAL ACTIVE UNITS</Text>
            <View style={styles.liveBadge}>
              <View style={styles.liveDot} />
              <Text style={styles.liveBadgeText}>Live</Text>
            </View>
          </View>
          
          <View style={styles.totalContainer}>
            <Text style={styles.totalNumber}>{totalUnits.toLocaleString()}</Text>
            <Text style={styles.totalLabel}>units</Text>
          </View>

          <View style={styles.statsBar}>
            {getStatsBarData().map((item, index) => (
              <View
                key={index}
                style={[
                  styles.statsBarSegment,
                  { width: `${item.percentage}%`, backgroundColor: item.color }
                ]}
              />
            ))}
          </View>
        </View>

        {/* Section Header */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Status Overview</Text>
        </View>

        {/* Status Grid */}
        <View style={styles.grid}>
          {getCardRows().map((row, rowIndex) => (
            <View key={rowIndex} style={styles.gridRow}>
              {row.map((item, index) => (
                <StatusCard
                  key={`${rowIndex}-${index}`}
                  icon={item.icon}
                  count={item.count}
                  label={item.label}
                  color={item.color}
                  bgColor={item.bgColor}
                  percentage={item.percentage}
                  trend={item.trend}
                  onPress={() => console.log(`${item.label} pressed`)}
                />
              ))}
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default SystemStatusScreen;