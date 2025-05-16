import React from 'react';
import styles from './About.module.css'; 

const teamMembers = [
    {
        name: 'Andre',
        role: 'App foundations & Playlist logic',
        photo: '/assets/andre.jpg',
        contribution: 'Came up with the original idea, set up project and implemented playlist functionality including adding favorite songs and integrating it with user authentication.',
      },
      {
        name: 'Dario',
        role: 'User Authentication & Admin Permissions',
        photo: '/assets/dario.jpg',
        contribution: 'Implemented user authentication & authorisation, set up the admin role and permissions system, and configured the MongoDB backend.',
      },
      {
        name: 'Kate',
        role: 'UI Design & External APIs integration',
        photo: '/assets/kate.jpg',
        contribution: 'Designed the full UI and responsive layout, implemented dynamic lyrics search and display using the lyrics.ovh API, integrated Spotify links, and created the About page.',
      },
]

export default function About() {
    return (
      <div className={styles.description}>
        <p >
        <strong>SingSation</strong> is a karaoke-inspired sing-along lyrics app that lets users search for, view, save, and manage their favorite song lyrics. 
          </p>
          <p>
          The app includes registration, login/logout, user profile, favourites/playlist functionality for registered users, and an admin dashboard for managing user permissions, all wrapped in a glowing neon-style UI.
          It fetches lyrics from the open-source <code>lyrics.ovh</code> API and includes a link to listen to the songs on Spotify.
          </p>
        <p>
        We built this app with love for ourselves and our friends to enjoy during get-togethers.
      It was a fun project—and we hope it brings fun to you, too!
        </p>
        <h3 className={styles.teamHeader}>Meet the Team:</h3>
        <div className={styles.teamGrid}>
          {teamMembers.map((member) => (
            <div key={member.name} className={styles.card}>
              <img src={member.photo} alt={member.name} className={styles.photo} />
              <h3>{member.name}</h3>
              <p><strong>{member.role}</strong></p>
              <p>{member.contribution}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

