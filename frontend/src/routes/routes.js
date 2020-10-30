import React from "react";
import Dashboard from "../components/Dashboard/Dashboard";
import Company from "../components/Company/Company";
import Schedule from "../components/Schedule/Schedule";
import Onboarding from "../components/Onboarding/Onboarding";
import OnboardingLanding from "../components/Onboarding/OnboardingLanding";
import OnboardingPersonal from "../components/Onboarding/OnboardingPersonal";
export const hrAppRoutes = [
    {
        'path': '/dashboard',
        'displayText': 'Dashboard',
        'component': <Dashboard/>
    },
    {
        'path': '/schedule',
        'displayText': 'Schedule',
        'component': <Schedule/>
    },
    {
        'path': '/company',
        'displayText': 'Company',
        'component': <Company/>
    },
    {
        'path': '/onboardinglanding',
        'component': <OnboardingLanding/>
    },
    {
        'path': '/onboarding',
        'component': <Onboarding/>
    },
    {
        'path': '/onboardingpersonal',
        'component': <OnboardingPersonal/>
    }
];

