'use client';

import { useState } from 'react';
import { Settings } from 'lucide-react';
import { SettingsMenu } from './SettingsMenu';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';

export function ShowSettings() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 z-50"> */}
      <div className="fixed bottom-0 right-10 z-50">
        <Dialog
          open={isOpen}
          onOpenChange={setIsOpen}
        >
          <DialogTrigger asChild>
            <Button
              size="lg"
              className="rounded-t-xl rounded-b-none px-6 py-3 h-12 bg-neutral-800/20 hover:bg-neutral-700/90 backdrop-blur-sm border border-neutral-600/50 border-b-0 shadow-lg transition-all duration-200 " //hover:translate-y-[-2px]
            >
              <Settings className="w-5 h-5 text-white" />
              {/* <span className="text-white text-sm font-medium">Configuraciones</span> */}
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-neutral-900/95 backdrop-blur-md border-neutral-700 text-white max-w-md">
            <DialogHeader>
              <DialogTitle className="text-4xl text-neutral-200">Configuraciones</DialogTitle>
            </DialogHeader>
            <Separator className="bg-neutral-600" />

            <div className="space-y-6 py-4">
              <SettingsMenu />
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}
