USE [Usuaris]
GO
/****** Object:  Table [dbo].[Tipus_Maquines]    Script Date: 08/07/2020 10:48:25 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Tipus_Maquines](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Nom] [varchar](100) NULL,
	[Ca] [varchar](100) NULL,
	[Es] [varchar](100) NULL,
	[En] [varchar](100) NULL,
	[MaquinaPrincipal] [varchar](100) NULL,
	[CapacitatProductiva] [int] NULL,
 CONSTRAINT [PK_Tipus_Maquines] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[Tipus_Maquines] ON 

INSERT [dbo].[Tipus_Maquines] ([Id], [Nom], [Ca], [Es], [En], [MaquinaPrincipal], [CapacitatProductiva]) VALUES (1, N'Paletitzador', N'Paletitzador', N'Paletizador', N'Paletizer', N'', NULL)
INSERT [dbo].[Tipus_Maquines] ([Id], [Nom], [Ca], [Es], [En], [MaquinaPrincipal], [CapacitatProductiva]) VALUES (2, N'Apilador', N'Apilador', N'Apilador', N'Stacker', N'Paletitzador', NULL)
INSERT [dbo].[Tipus_Maquines] ([Id], [Nom], [Ca], [Es], [En], [MaquinaPrincipal], [CapacitatProductiva]) VALUES (3, N'Entrada', N'Entrada', N'Entrada', N'Input', N'Paletitzador', NULL)
INSERT [dbo].[Tipus_Maquines] ([Id], [Nom], [Ca], [Es], [En], [MaquinaPrincipal], [CapacitatProductiva]) VALUES (4, N'Sortida', N'Sortida', N'Salida', N'Output', N'Paletitzador', NULL)
INSERT [dbo].[Tipus_Maquines] ([Id], [Nom], [Ca], [Es], [En], [MaquinaPrincipal], [CapacitatProductiva]) VALUES (5, N'Robot', N'Robot', N'Robot', N'Robot', N'Paletitzador', NULL)
INSERT [dbo].[Tipus_Maquines] ([Id], [Nom], [Ca], [Es], [En], [MaquinaPrincipal], [CapacitatProductiva]) VALUES (6, N'Formadora', N'Formadora', N'Formadora', N'Forming Machine', NULL, 18)
INSERT [dbo].[Tipus_Maquines] ([Id], [Nom], [Ca], [Es], [En], [MaquinaPrincipal], [CapacitatProductiva]) VALUES (7, N'Tancadora', N'Tancadora', N'Cerradora', N'Closing Machine', NULL, NULL)
INSERT [dbo].[Tipus_Maquines] ([Id], [Nom], [Ca], [Es], [En], [MaquinaPrincipal], [CapacitatProductiva]) VALUES (8, N'Bases', N'Bases (visió)', N'Bases (visió)', N'Bases (visió)', NULL, NULL)
INSERT [dbo].[Tipus_Maquines] ([Id], [Nom], [Ca], [Es], [En], [MaquinaPrincipal], [CapacitatProductiva]) VALUES (9, N'Tapador', N'Tapador', N'Tapadora', N'Cover Machine', NULL, 15)
INSERT [dbo].[Tipus_Maquines] ([Id], [Nom], [Ca], [Es], [En], [MaquinaPrincipal], [CapacitatProductiva]) VALUES (10, N'Agrupador', N'Agrupador', N'Agrupador', N'Grouper', NULL, NULL)
INSERT [dbo].[Tipus_Maquines] ([Id], [Nom], [Ca], [Es], [En], [MaquinaPrincipal], [CapacitatProductiva]) VALUES (1001, N'Aranya', N'P&P', N'P&P', N'P&P', NULL, 60)
INSERT [dbo].[Tipus_Maquines] ([Id], [Nom], [Ca], [Es], [En], [MaquinaPrincipal], [CapacitatProductiva]) VALUES (1002, N'Linia', N'Linia', N'Linia', N'Line', NULL, 8)
INSERT [dbo].[Tipus_Maquines] ([Id], [Nom], [Ca], [Es], [En], [MaquinaPrincipal], [CapacitatProductiva]) VALUES (1003, N'Transfer', N'Transfer', N'Transfer', N'Transfer', N'Paletitzador', NULL)
INSERT [dbo].[Tipus_Maquines] ([Id], [Nom], [Ca], [Es], [En], [MaquinaPrincipal], [CapacitatProductiva]) VALUES (1004, N'RobotPiP', N'Robot P&P', N'Robot P&P', N'Robot P&P', NULL, 30)
INSERT [dbo].[Tipus_Maquines] ([Id], [Nom], [Ca], [Es], [En], [MaquinaPrincipal], [CapacitatProductiva]) VALUES (1005, N'Girador', N'Girador', N'Girador', N'Box Turner', N'Paletitzador', NULL)
INSERT [dbo].[Tipus_Maquines] ([Id], [Nom], [Ca], [Es], [En], [MaquinaPrincipal], [CapacitatProductiva]) VALUES (1006, N'Plegador', N'Plegador', N'Plegador', N'Flap Folder', NULL, NULL)
INSERT [dbo].[Tipus_Maquines] ([Id], [Nom], [Ca], [Es], [En], [MaquinaPrincipal], [CapacitatProductiva]) VALUES (1007, N'Strapex', N'Strapex', N'Strapex', N'Strapex', NULL, NULL)
INSERT [dbo].[Tipus_Maquines] ([Id], [Nom], [Ca], [Es], [En], [MaquinaPrincipal], [CapacitatProductiva]) VALUES (1008, N'Alimentacio', N'Alimentacio', N'Alimentacio', N'Feed', NULL, NULL)
INSERT [dbo].[Tipus_Maquines] ([Id], [Nom], [Ca], [Es], [En], [MaquinaPrincipal], [CapacitatProductiva]) VALUES (1009, N'LiniaGeneral', N'LiniaGeneral', N'LiniaGeneral', N'General Line', NULL, NULL)
INSERT [dbo].[Tipus_Maquines] ([Id], [Nom], [Ca], [Es], [En], [MaquinaPrincipal], [CapacitatProductiva]) VALUES (1010, N'Via', N'Via', N'Via', N'Track', N'Paletitzador', NULL)


SET IDENTITY_INSERT [dbo].[Tipus_Maquines] OFF
