'use client'

import { useState, useEffect } from 'react'
import { getSettings } from '@/services/settingsService'
import type { SiteSettings } from '@/types'

export function useSettings() {
  const [settings, setSettings] = useState<SiteSettings | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getSettings()
      .then((res) => setSettings(res.data))
      .catch(() => setSettings(null))
      .finally(() => setLoading(false))
  }, [])

  return { settings, loading }
}
