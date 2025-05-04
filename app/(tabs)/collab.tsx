import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Share,
  Pressable,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useAuth } from '@/context/AuthContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

export default function CollabScreen() {
  const { authUser } = useAuth();
  const navigation = useNavigation();

  const [selectedAssignment, setSelectedAssignment] = useState({
    id: '1',
    title: 'Mobile Computing Assignment 1.1',
    school: 'Technological Institute of the Philippines Quezon City',
    college: 'College of Computer Studies',
    courseCode: 'CS 409-IT3251',
    courseName: 'Mobile Computing Technologies',
    term: 'Midterm Period',
    author: 'De Vera, Jhonas Stephen John D.',
    members: [
      'Delas Armas, Rhovic',
      'Pelayo, Albert John',
      'Marcelo, Miguel',
      'Dela Merced, John'
    ],
    program: 'BSIT / IT3251',
    instructor: 'Ms. Keila Marie Mauricio',
    task: 'Assignment 3.1: Project Proposal',
    status: 'Approved',
    description: 'Brainstorming is a collaborative task management app designed to help individuals and teams organize, track, and complete tasks efficiently. The app uses Cloud Computing to store and sync data in real-time, enabling seamless collaboration across multiple devices and users. It\'s ideal for students, professionals, or small teams who need a simple yet powerful tool to manage their tasks and projects.'
  });

  const [collaborators, setCollaborators] = useState([
    {
      id: '1',
      name: 'Mike',
      role: 'Owner',
      photoURL: 'https://randomuser.me/api/portraits/men/32.jpg',
    },
    {
      id: '2',
      name: 'Jake',
      role: 'Editor',
      photoURL: 'https://randomuser.me/api/portraits/men/45.jpg',
    },
    {
      id: '3',
      name: 'Miguel',
      role: 'Viewer',
      photoURL: 'https://randomuser.me/api/portraits/men/68.jpg',
    }
  ]);

  const handleBackNavigation = () => {
    console.log('Back button pressed');
  };

  const handleShareAssignment = async () => {
    try {
      await Share.share({
        message: `Check out our ${selectedAssignment.title}`,
        title: selectedAssignment.title,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={handleBackNavigation}
        >
          <Ionicons name="chevron-back" size={24} color="#FFF" />
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
        
        <Text style={styles.headerTitle}>{selectedAssignment.title}</Text>
        
        <TouchableOpacity style={styles.menuButton}>
          <Ionicons name="ellipsis-vertical" size={24} color="#FFF" />
        </TouchableOpacity>
      </View>

      {/* Main Content */}
      <ScrollView 
        style={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Assignment Information Card */}
        <View style={styles.assignmentCard}>
          <Text style={styles.schoolName}>{selectedAssignment.school}</Text>
          <Text style={styles.collegeName}>{selectedAssignment.college}</Text>
          <Text style={styles.courseInfo}>
            {selectedAssignment.courseCode} - {selectedAssignment.courseName}
          </Text>
          <Text style={styles.termInfo}>{selectedAssignment.term}</Text>
          
          <Text style={styles.infoLabel}>
            Name: <Text style={styles.infoValue}>{selectedAssignment.author}</Text>
          </Text>
          
          <Text style={styles.infoLabel}>
            Members: <Text style={styles.infoValue}>{selectedAssignment.members.join(', ')}</Text>
          </Text>
          
          <Text style={styles.infoLabel}>
            Program/Section: <Text style={styles.infoValue}>{selectedAssignment.program}</Text>
          </Text>
          
          <Text style={styles.infoLabel}>
            Instructor: <Text style={styles.infoValue}>{selectedAssignment.instructor}</Text>
          </Text>
          
          <Text style={styles.infoLabel}>
            Assessment Task: <Text style={styles.infoValue}>{selectedAssignment.task}</Text>
          </Text>
          
          <Text style={styles.statusText}>{selectedAssignment.status}</Text>
          
          <Text style={styles.description}>
            {selectedAssignment.description}
          </Text>
          
          {/* Share Button */}
          <TouchableOpacity 
            style={styles.shareButton}
            onPress={handleShareAssignment}
          >
            <Ionicons name="share-social-outline" size={24} color="#FFF" />
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Left Panel - Task List (Visible in a full implementation with split view) */}
      {/* This would typically be part of a drawer or split view in a real implementation */}
      <View style={styles.leftPanelOverlay}>
        <View style={styles.leftPanel}>
          {/* Header */}
          <View style={styles.leftPanelHeader}>
            <TouchableOpacity style={styles.leftBackButton}>
              <Ionicons name="chevron-back" size={24} color="#FFF" />
              <Text style={styles.backText}>Back</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.createButton}>
              <Ionicons name="add" size={18} color="#FFF" />
              <Text style={styles.createText}>Create</Text>
            </TouchableOpacity>
          </View>
          
          {/* Assignment Card with Share Option */}
          <View style={styles.projectCard}>
            <Ionicons name="notifications-outline" size={20} color="#b8b4dd" style={styles.bellIcon} />
            
            <Text style={styles.projectCardTitle}>
              {selectedAssignment.title}
            </Text>
            
            <TouchableOpacity style={styles.projectMenuButton}>
              <Ionicons name="ellipsis-vertical" size={20} color="#FFF" />
            </TouchableOpacity>
            
            <Text style={styles.shareCardTitle}>
              Share "{selectedAssignment.title}"
            </Text>
            
            {/* Collaborators */}
            {collaborators.map((collaborator) => (
              <View key={collaborator.id} style={styles.collaboratorRow}>
                <Image 
                  source={{ uri: collaborator.photoURL }} 
                  style={styles.collaboratorAvatar} 
                />
                <View style={styles.collaboratorInfo}>
                  <Text style={styles.collaboratorName}>{collaborator.name}</Text>
                  <Text style={styles.collaboratorRole}>- {collaborator.role}</Text>
                </View>
              </View>
            ))}
            
            {/* Add People Button */}
            <TouchableOpacity style={styles.addPersonRow}>
              <View style={styles.addPersonCircle}>
                <Ionicons name="person-add" size={20} color="#FFF" />
              </View>
              <Text style={styles.addPersonText}>Add People</Text>
            </TouchableOpacity>
            
            {/* Link Icon */}
            <TouchableOpacity style={styles.linkButton}>
              <Ionicons name="link" size={24} color="#FFF" />
            </TouchableOpacity>
          </View>
          
          {/* Another Project Card Example */}
          <View style={styles.dummyProjectCard}>
            <Ionicons name="notifications-outline" size={20} color="#b8b4dd" />
            <Text style={styles.dummyProjectTitle}>System and Design Chapter 1</Text>
            <TouchableOpacity style={styles.dummyShareButton}>
              <Ionicons name="share-social-outline" size={18} color="#FFF" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D0C0F',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 15,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backText: {
    color: '#FFF',
    fontFamily: 'PlusJakartaSans_Regular',
    fontSize: 16,
    marginLeft: 5,
  },
  headerTitle: {
    color: '#FFF',
    fontFamily: 'PlusJakartaSans_Bold',
    fontSize: 16,
  },
  menuButton: {
    padding: 4,
  },
  contentContainer: {
    flex: 1,
    padding: 10,
  },
  assignmentCard: {
    backgroundColor: '#1A1A1F',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    position: 'relative',
  },
  schoolName: {
    color: '#FFF',
    fontFamily: 'PlusJakartaSans_Bold',
    fontSize: 16,
    textAlign: 'center',
  },
  collegeName: {
    color: '#FFF',
    fontFamily: 'PlusJakartaSans_Regular',
    fontSize: 15,
    textAlign: 'center',
    marginBottom: 5,
  },
  courseInfo: {
    color: '#FFF',
    fontFamily: 'PlusJakartaSans_Bold',
    fontSize: 14,
    textAlign: 'center',
  },
  termInfo: {
    color: '#FFF',
    fontFamily: 'PlusJakartaSans_Regular',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 15,
  },
  infoLabel: {
    color: '#FFF',
    fontFamily: 'PlusJakartaSans_Bold',
    fontSize: 14,
    marginBottom: 6,
  },
  infoValue: {
    fontFamily: 'PlusJakartaSans_Regular',
  },
  statusText: {
    color: '#6A5ACD',
    fontFamily: 'PlusJakartaSans_Bold',
    fontSize: 15,
    marginTop: 10,
    marginBottom: 12,
  },
  description: {
    color: '#FFF',
    fontFamily: 'PlusJakartaSans_Regular',
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'justify',
  },
  shareButton: {
    position: 'absolute',
    bottom: 15,
    right: 15,
    backgroundColor: 'rgba(106, 90, 205, 0.3)',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  leftPanelOverlay: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  leftPanel: {
    flex: 1,
    backgroundColor: '#0D0C0F',
    width: 300,
    padding: 15,
  },
  leftPanelHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    paddingTop: 10,
  },
  leftBackButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  createButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#6A5ACD',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 5,
  },
  createText: {
    color: '#FFF',
    marginLeft: 5,
    fontFamily: 'PlusJakartaSans_Regular',
  },
  projectCard: {
    backgroundColor: '#6A5ACD',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    position: 'relative',
    paddingBottom: 20,
  },
  bellIcon: {
    position: 'absolute',
    top: 10,
    left: 10,
  },
  projectCardTitle: {
    color: '#FFF',
    fontFamily: 'PlusJakartaSans_Bold',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 15,
    marginBottom: 10,
  },
  projectMenuButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  shareCardTitle: {
    color: '#FFF',
    fontFamily: 'PlusJakartaSans_Bold',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 15,
    marginBottom: 15,
  },
  collaboratorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  collaboratorAvatar: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    marginRight: 10,
  },
  collaboratorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  collaboratorName: {
    color: '#FFF',
    fontFamily: 'PlusJakartaSans_Regular',
    fontSize: 14,
  },
  collaboratorRole: {
    color: '#FFF',
    fontFamily: 'PlusJakartaSans_Regular',
    fontSize: 14,
    marginLeft: 4,
  },
  addPersonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  addPersonCircle: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: '#3D3D3D',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  addPersonText: {
    color: '#FFF',
    fontFamily: 'PlusJakartaSans_Regular',
    fontSize: 14,
  },
  linkButton: {
    position: 'absolute',
    bottom: 10,
    right: 20,
    width: 35,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dummyProjectCard: {
    backgroundColor: '#6A5ACD',
    borderRadius: 12,
    padding: 15,
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  dummyProjectTitle: {
    flex: 1,
    color: '#FFF',
    fontFamily: 'PlusJakartaSans_Regular',
    fontSize: 14,
    marginLeft: 8,
  },
  dummyShareButton: {
    padding: 5,
  },
});