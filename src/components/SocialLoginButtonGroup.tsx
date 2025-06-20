import React from 'react';
import { Button } from "@/components/ui/button";
import { Github, Chrome, Facebook as FacebookIcon } from 'lucide-react'; // Renamed Facebook to FacebookIcon to avoid conflict if any

interface SocialLoginButtonProps {
  provider: 'google' | 'github' | 'facebook';
  onClick: (provider: 'google' | 'github' | 'facebook') => void;
  icon: React.ReactNode;
  text: string;
}

const SocialButton: React.FC<SocialLoginButtonProps> = ({ provider, onClick, icon, text }) => {
  return (
    <Button variant="outline" className="w-full flex items-center justify-center gap-2" onClick={() => onClick(provider)}>
      {icon}
      <span>{text}</span>
    </Button>
  );
};

interface SocialLoginButtonGroupProps {
  onSocialLogin?: (provider: 'google' | 'github' | 'facebook') => void;
  providers?: ('google' | 'github' | 'facebook')[];
}

const SocialLoginButtonGroup: React.FC<SocialLoginButtonGroupProps> = ({
  onSocialLogin = (provider) => console.log(`Login with ${provider} initiated`),
  providers = ['google', 'github', 'facebook'],
}) => {
  console.log('SocialLoginButtonGroup loaded');

  const providerDetails = {
    google: { icon: <Chrome className="h-5 w-5" />, text: "Sign in with Google" },
    github: { icon: <Github className="h-5 w-5" />, text: "Sign in with GitHub" },
    facebook: { icon: <FacebookIcon className="h-5 w-5" />, text: "Sign in with Facebook" },
  };

  return (
    <div className="space-y-3">
      {providers.map((provider) => {
        const details = providerDetails[provider];
        if (!details) return null;
        return (
          <SocialButton
            key={provider}
            provider={provider}
            onClick={onSocialLogin}
            icon={details.icon}
            text={details.text}
          />
        );
      })}
    </div>
  );
};

export default SocialLoginButtonGroup;