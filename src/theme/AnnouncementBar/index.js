import React, {useEffect} from 'react';
import clsx from 'clsx';
import {ThemeClassNames, useThemeConfig} from '@docusaurus/theme-common';
import {useAnnouncementBar} from '@docusaurus/theme-common/internal';
import AnnouncementBarCloseButton from '@theme/AnnouncementBar/CloseButton';
import AnnouncementBarContent from '@theme/AnnouncementBar/Content';
import styles from './styles.module.css';

export default function AnnouncementBar() {
  const {announcementBar} = useThemeConfig();
  const {isActive, close} = useAnnouncementBar();

  useEffect(() => {
    // 7-Day Cooldown Logic
    if (typeof window !== 'undefined' && announcementBar) {
      const storageKeyDismiss = 'docusaurus.announcement.dismiss';
      const storageKeyId = 'docusaurus.announcement.id';
      const storageKeyClosedAt = 'tit.announcement.closedAt';
      
      const isDismissed = localStorage.getItem(storageKeyDismiss) === 'true';
      const closedAt = localStorage.getItem(storageKeyClosedAt);

      if (isDismissed && closedAt) {
        const daysSinceClosed = (Date.now() - parseInt(closedAt, 10)) / (1000 * 60 * 60 * 24);
        if (daysSinceClosed >= 7) {
          // Cooldown expired. Clear Docusaurus storage so it shows again on the next page load.
          localStorage.removeItem(storageKeyDismiss);
          localStorage.removeItem(storageKeyId);
          localStorage.removeItem(storageKeyClosedAt);
        }
      }
    }
  }, [announcementBar]);

  const handleClose = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('tit.announcement.closedAt', Date.now().toString());
    }
    close();
  };

  if (!isActive) {
    return null;
  }
  const {backgroundColor, textColor, isCloseable} = announcementBar;
  return (
    <div
      className={clsx(
        ThemeClassNames.announcementBar.container,
        styles.announcementBar,
      )}
      style={{backgroundColor, color: textColor}}
      role="banner">
      {isCloseable && <div className={styles.announcementBarPlaceholder} />}
      <AnnouncementBarContent className={styles.announcementBarContent} />
      {isCloseable && (
        <AnnouncementBarCloseButton
          onClick={handleClose}
          className={styles.announcementBarClose}
        />
      )}
    </div>
  );
}
